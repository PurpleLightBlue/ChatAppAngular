import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/Users`;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    alert(this.apiUrl);
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return !!localStorage.getItem('token');
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.http
          .post(
            `${this.apiUrl}/logout`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .subscribe(() => {
            localStorage.removeItem('token');
          });
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('token');
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded?.username || null;
    }
    return null;
  }
}
