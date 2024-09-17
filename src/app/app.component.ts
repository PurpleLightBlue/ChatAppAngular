import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ChatComponent } from './components/chat/chat.component'; // Import provideHttpClient and withFetch
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatComponent, RouterModule, BannerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-chat-app';
}
