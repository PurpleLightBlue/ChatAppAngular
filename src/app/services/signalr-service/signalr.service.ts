import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { UserService } from '../user-service/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | null = null;
  private messagesSubject = new BehaviorSubject<
    { user: string; message: string }[]
  >([]);
  public messages$ = this.messagesSubject.asObservable();
  private readonly maxRetries = 5;
  private readonly retryDelay = 2000; // 2 seconds

  constructor(private userService: UserService) {
    const token = this.userService.getToken(); // Assuming token is stored in localStorage

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5273/chathub', {
        accessTokenFactory: () => (token ? token : ''),
      }) // API address
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      const messages = this.messagesSubject.value;
      messages.push({ user, message });
      this.messagesSubject.next(messages);
    });

    this.hubConnection
      .start()
      .catch((err) => console.error('Error starting SignalR connection:', err));
  }

  // public startConnection(): void {
  //   const token = this.userService.getToken();
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:7048/chathub', {
  //       accessTokenFactory: () => (token ? token : ''),
  //     }) // Replace with your API endpoint
  //     .configureLogging(signalR.LogLevel.Information)
  //     .withAutomaticReconnect([0, 2000, 10000, 30000])
  //     .build();

  //   this.hubConnection
  //     .start()
  //     .then(() => console.log('Connection started'))
  //     .catch((err) => {
  //       console.log('Error while starting connection: ' + err);
  //       this.retryConnection();
  //     });

  //   this.hubConnection.onclose(() => {
  //     console.log('Connection closed');
  //     this.retryConnection();
  //   });
  // }

  private retryConnection(retries = 0): void {
    if (retries < this.maxRetries) {
      setTimeout(() => {
        this.hubConnection
          ?.start()
          .then(() => console.log('Connection restarted'))
          .catch((err) => {
            console.log('Error while restarting connection: ' + err);
            this.retryConnection(retries + 1);
          });
      }, this.retryDelay);
    } else {
      console.log('Max retries reached. Could not reconnect.');
    }
  }

  public addTransferChatDataListener(
    callback: (message: string, senderId: string) => void
  ): void {
    this.hubConnection?.on('ReceiveMessage', (message, senderId) => {
      console.log('Message received: ', message, ' from: ', senderId);
      callback(message, senderId);
    });
  }

  public sendMessage(content: string, chatRoomName: string): void {
    //const token = this.userService.getToken();
    this.hubConnection
      ?.invoke('SendMessage', content, chatRoomName)
      .catch((err) => console.error(err));
  }

  addToRoom(roomName: string): void {
    this.hubConnection
      ?.invoke('AddToRoomAsync', roomName)
      .catch((err) => console.error('Error while adding to room:', err));
  }

  removeFromRoom(roomName: string): void {
    this.hubConnection
      ?.invoke('RemoveFromRoomAsync', roomName)
      .catch((err) => console.error('Error while removing from room:', err));
  }

  public getChatTranscript(chatRoomName: string): Promise<any[]> {
    if (!this.hubConnection) {
      return Promise.resolve([]);
    }
    return this.hubConnection
      .invoke('GetChatTranscript', chatRoomName)
      .catch((err) => {
        console.error('Error fetching chat transcript: ' + err);
        return [];
      });
  }
}
