import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private emailKey = 'loginEmail';

  http = inject(HttpClient);

  login(email: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/v1/auth/login`,
        { email }
      )
      .pipe(
        timeout(30 * 1000)
      );
  }

  verifyOtp(email: string | null, otp: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/v1/auth/verification`,
        { email, otp },
        { withCredentials: true }
      )
      .pipe(
        timeout(30 * 1000)
      );
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

  setAccessToken(accessToken: string): void {
    localStorage.setItem("goppho_access_token", accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem("goppho_access_token");
  }

  clearAccessToken(): void {
    localStorage.clear();
  }
}
