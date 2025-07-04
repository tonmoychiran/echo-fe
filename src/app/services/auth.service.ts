import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private emailKey = 'loginEmail';

  http = inject(HttpClient);

  login(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/auth/login`, { email });
  }

  verifyOtp(email: string | null, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/auth/verification`, { email, otp }, { withCredentials: true });
  }

  setEmail(email: string): void {
    sessionStorage.setItem(this.emailKey, email);
  }

  getEmail(): string | null {
    return sessionStorage.getItem(this.emailKey);
  }

  clearEmail(): void {
    sessionStorage.removeItem(this.emailKey);
  }
}
