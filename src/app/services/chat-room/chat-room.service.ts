import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoom } from '../../models/chat-room/chat-room.model';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  private apiUrl = `${environment.apiUrl}/api/ChatRoom`;

  constructor(private http: HttpClient) {}

  getJoinableRooms(): Observable<ChatRoom[]> {
    // alert(this.apiUrl);
    return this.http.get<ChatRoom[]>(`${this.apiUrl}`);
  }

  createRoom(chatRoomName: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}`,
      JSON.stringify(chatRoomName),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  joinRoom(chatRoomName: string, userName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${chatRoomName}/join`, {
      userName,
    });
  }

  leaveRoom(chatRoomName: string, userName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${chatRoomName}/leave`, {
      userName,
    });
  }
}
