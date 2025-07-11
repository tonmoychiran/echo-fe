import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-verify-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-login.component.html',
  styleUrl: './verify-login.component.css'
})
export class VerifyLoginComponent {
  otp: string = "";
  isVerifyLoading = signal(false);
  isResendLoading = signal(false);
  errorMessage = signal("");
  email = signal("");

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const navigatedEmail = navigation?.extras?.state?.['email'] || "";
    if (!navigatedEmail) {
      this.router.navigate([AppRoutes.LOGIN]);
    }

    this.email.set(navigatedEmail);
  }

  verifyOtp() {
    if (!this.otp?.trim()) {
      this.errorMessage.set('OTP is empty');
      return;
    }

    this.isVerifyLoading.set(true);

    this.authService.verifyOtp(this.email(), this.otp)
      .pipe(
        switchMap(response => {
          const accessToken = response?.accessToken;
          this.authService.setAccessToken(accessToken);
          return this.userService.getUserInformation();
        })
      )
      .subscribe({
        next: (response) => {
          this.isVerifyLoading.set(false);
          if (response?.data) {
            this.router.navigate([AppRoutes.ONLINE_FRIENDS]);
          } else {
            this.router.navigate([AppRoutes.REGISTER_NAME]);
          }
        },
        error: (error) => {
          this.isVerifyLoading.set(false);
          this.errorMessage.set(error?.error?.message || 'OTP Verification Failed');
        }
      });
  }

  resendOtp() {
    this.isResendLoading.set(true);
    this.authService.login(this?.email() || "").subscribe({
      next: (response) => {
      },
      error: (error) => {
        this.isResendLoading.set(false);
        this.errorMessage.set(error?.error?.message || 'OTP Resend Failed');
      },
      complete: () => {
        this.isResendLoading.set(false);
      }
    });
  }


}
