import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-login.component.html',
  styleUrl: './verify-login.component.css'
})
export class VerifyLoginComponent {
  otp: string = "";
  isLoading = signal(false);
  isResendLoading = signal(false);
  errorMessage = signal("");
  email = signal<string | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.email.set(this.authService.getEmail());
  }

  verifyOtp() {

    if (!this.otp) {
      this.errorMessage.set("OTP is empty");
      return;
    }

    this.isLoading.set(true);

    this.authService.verifyOtp(this.email(), this.otp).subscribe({
      next: (response) => {
        this.authService.clearEmail();
        this.router.navigate(['/chat-list']);
      },
      error: (error) => {
        this.errorMessage.set(error?.error?.message || 'OTP Verification Failed');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });

  }

  resendOtp() {
    if (!this.email()) {
      this.router.navigate(['/login']);
      return;
    }

    this.isResendLoading.set(true);
    this.authService.login(this?.email() || "").subscribe({
      next: (response) => {
      },
      error: (error) => {
        this.errorMessage.set(error?.error?.message || 'OTP Resend Failed');
      },
      complete: () => {
        this.isResendLoading.set(false);
      }
    });
  }
}
