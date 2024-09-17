import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ChatComponent } from './components/chat/chat.component';
// import { authGuard } from './components/guards/auth-guard/auth.guard';
import { CreateChatRoomComponent } from './components/create-chat-room/create-chat-room.component';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'chat-room/:roomName', component: ChatComponent },
  { path: 'chatList', component: ChatRoomListComponent },
  { path: 'create-chat-room', component: CreateChatRoomComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
