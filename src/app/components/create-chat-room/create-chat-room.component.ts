import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatRoomService } from '../../services/chat-room/chat-room.service';
import { ChatRoom } from '../../models/chat-room/chat-room.model';

@Component({
  selector: 'app-create-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-chat-room.component.html',
  styleUrl: './create-chat-room.component.css',
})
export class CreateChatRoomComponent {
  chatRoomName: string = '';

  constructor(private chatRoomService: ChatRoomService) {}

  createRoom() {
    this.chatRoomService.createRoom(this.chatRoomName).subscribe(
      () => {
        console.log('Chat room created successfully');
        // Handle success (e.g., navigate to the chat room or show a success message)
      },
      (error) => {
        console.error('Error creating chat room', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
}
