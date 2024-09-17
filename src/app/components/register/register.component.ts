import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registration failed!');
      }
    );
  }
}
