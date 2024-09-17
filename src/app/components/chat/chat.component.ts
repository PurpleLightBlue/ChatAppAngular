import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../services/signalr-service/signalr.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  //implements OnInit {
  message: string = '';
  senderId: string = ''; // Replace with actual user ID
  chatRoomName: string = ''; // Replace with actual chat room name
  messages: { user: string; message: string }[] = [];

  constructor(
    private signalrService: SignalrService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.signalrService.messages$.subscribe((messages) => {
      this.messages = messages;
    });

    this.route.paramMap.subscribe((params) => {
      this.chatRoomName = params.get('roomName') || '';
    });
  }

  ngOnInit(): void {
    // Get user info from token
    this.senderId = this.userService.getUsernameFromToken()!;
    if (!this.senderId) {
      console.error('Username could not be retrieved from token.');
      return;
    }
    // Get room name from route params
    this.route.paramMap.subscribe((params) => {
      this.chatRoomName = params.get('roomName') || '';
      this.fetchChatTranscript(); // Fetch existing chat history when room is loaded
    });

    // Optionally, you can set up an event listener for new messages (SignalR)
    this.signalrService.addTransferChatDataListener((message, senderId) => {
      this.messages.push({ message, user: senderId });
    });
  }

  // Fetch chat transcript for the room
  fetchChatTranscript(): void {
    this.signalrService
      .getChatTranscript(this.chatRoomName)
      .then((transcript) => {
        this.messages = transcript;
      });
  }

  // ngOnInit(): void {
  //   this.senderId = this.userService.getUsernameFromToken()!;
  //   this.route.paramMap.subscribe((params) => {
  //     this.chatRoomName = params.get('roomName') || '';
  //     this.fetchChatTranscript();
  //   });

  //   //this.signalrService.startConnection();
  //   this.signalrService.addTransferChatDataListener((message, senderId) => {
  //     this.chatTranscript.push({ message, senderId });
  //   });
  // }

  // fetchChatTranscript(): void {
  //   this.signalrService
  //     .getChatTranscript(this.chatRoomName)
  //     .then((transcript) => {
  //       this.chatTranscript = transcript;
  //     });
  // }

  sendMessage(): void {
    if (this.message.trim()) {
      this.signalrService.sendMessage(this.message, this.chatRoomName);
      this.message = ''; // Clear message input
    }
  }
}
