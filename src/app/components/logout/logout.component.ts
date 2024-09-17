import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
