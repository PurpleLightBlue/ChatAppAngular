import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = {
    username: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.user).subscribe(
      (response) => {
        alert('Login successful!');
        this.router.navigate(['/chatList']);
      },
      (error) => {
        alert('Login failed!');
      }
    );
  }
}
