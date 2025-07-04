import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = signal(false);

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.isLoading.set(true);

      this.authService.login(email).subscribe({
        next: (response) => {
          this.authService.setEmail(email);
          this.toastService.show('OTP Sent', 'success', 5000);
          this.router.navigate(['/verify-login']);
        },
        error: (error) => {
          this.isLoading.set(false);
          const errorMessage = error?.error?.message || 'OTP Send Failed';
          this.toastService.show(errorMessage, 'error', 5000);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get emailControl() {
    return this.loginForm.get('email');
  }
}
