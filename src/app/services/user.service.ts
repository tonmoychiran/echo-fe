import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;


  authService = inject(AuthService);
  http = inject(HttpClient);



  getUserInformation(): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    return this.http
      .get(`${this.apiUrl}/v1/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      )
      .pipe(
        timeout(30 * 1000)
      );

  }

  updateUserName(name: string): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    return this.http
      .put(`${this.apiUrl}/v1/user/name`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      )
      .pipe(
        timeout(30 * 1000)
      );
  }

  updateUserDOB(dob: string): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    return this.http
      .put(`${this.apiUrl}/v1/user/dob`,
        { dob },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      )
      .pipe(
        timeout(30 * 1000)
      );
  }
}
