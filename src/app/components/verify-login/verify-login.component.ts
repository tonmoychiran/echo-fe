import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-login.component.html',
  styleUrl: './verify-login.component.css'
})
export class VerifyLoginComponent {
  verifyLoginForm!: FormGroup;
  isLoading = signal(false);
  isResendLoading = signal(false);
  email = signal<string | null>(null);

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  constructor() {
    this.email.set(this.authService.getEmail());
  }

  ngOnInit() {
    this.verifyLoginForm = new FormGroup({
      otp: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (this.verifyLoginForm.valid) {
      const otp = this.verifyLoginForm.value.otp;
      this.isLoading.set(true);

      this.authService.verifyOtp(this.email(), otp).subscribe({
        next: (response) => {
          this.authService.clearEmail();
          this.toastService.show('Verified', 'success', 5000);
          this.router.navigate(['/chat-list']);
        },
        error: (error) => {
          this.isLoading.set(false);
          const errorMessage = error?.error?.message || 'OTP Verification Failed';
          this.toastService.show(errorMessage, 'error', 5000);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });

    } else {
      this.verifyLoginForm.markAllAsTouched();
    }
  }

  resendOtp() {
    const savedEmail = this.email();
    if (savedEmail) {
      this.isResendLoading.set(true);
      this.authService.login(savedEmail).subscribe({
        next: (response) => {
          this.toastService.show('OTP Resent', 'success', 5000);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Failed to resend OTP';
          this.toastService.show(errorMessage, 'error', 5000);
        },
        complete: () => {
          this.isResendLoading.set(false);
        }
      });
    } else {
      this.toastService.show('No email found', 'error', 5000);
      this.router.navigate(['/login']);
    }
  }

  get otpControl() {
    return this.verifyLoginForm.get('otp');
  }
}
