import { Component } from '@angular/core';
import { ChatRoomService } from '../../services/chat-room/chat-room.service';
import { SignalrService } from '../../services/signalr-service/signalr.service';
import { UserService } from '../../services/user-service/user.service';
import { ChatRoom } from '../../models/chat-room/chat-room.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-room-list.component.html',
  styleUrl: './chat-room-list.component.css',
})
export class ChatRoomListComponent {
  joinableRooms: ChatRoom[] = [];
  userName: string | null = null;

  constructor(
    private chatRoomService: ChatRoomService,
    private signalrService: SignalrService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.userService.getUsernameFromToken();
    this.loadJoinableRooms();
  }

  loadJoinableRooms(): void {
    this.chatRoomService.getJoinableRooms().subscribe(
      (rooms: ChatRoom[]) => {
        this.joinableRooms = rooms;
      },
      (error) => {
        console.error('Error fetching joinable rooms:', error);
      }
    );
  }

  joinRoom(roomName: string): void {
    this.signalrService.addToRoom(roomName);
    console.log(`Joined room: ${roomName}`);
  }

  leaveRoom(roomName: string): void {
    this.signalrService.removeFromRoom(roomName);
    console.log(`Left room: ${roomName}`);
  }

  openCreateRoom(): void {
    this.router.navigate(['/create-chat-room']);
  }

  openChatRoom(roomName: string): void {
    this.router.navigate(['/chat-room', encodeURIComponent(roomName)]);
  }
}
