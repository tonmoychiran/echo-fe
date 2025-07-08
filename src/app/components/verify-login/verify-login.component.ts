import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
  email = signal<string | null>(null);

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    this.email.set(this.authService.getEmail());
  }

  verifyOtp() {

    if (!this.otp?.trim()) {
      this.errorMessage.set("OTP is empty");
      return;
    }

    this.isVerifyLoading.set(true);

    this.authService.verifyOtp(this.email(), this.otp).subscribe({
      next: (response) => {
        const accessToken = response?.accessToken;
        this.authService.setAccessToken(accessToken);
        this.getUserProfileInformation();
      },
      error: (error) => {
        this.isVerifyLoading.set(false);
        this.errorMessage.set(error?.error?.message || 'OTP Verification Failed');
      },
      complete: () => {
        this.isVerifyLoading.set(false);
      }
    });

  }

  resendOtp() {
    if (!this.email()?.trim()) {
      this.router.navigate(['/login']);
      return;
    }

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

  getUserProfileInformation() {
    this.userService.getUserInformation().subscribe({
      next: (response) => {
        if (response?.data) {
          this.router.navigate(['/chat']);
        } else {
          this.router.navigate(['/register/name'])
        }
      },
      error: (error) => {
        this.errorMessage.set('Unknown error occured');
      },
      complete: () => {
      }
    })
  }
}
