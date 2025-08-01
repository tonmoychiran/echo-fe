import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  errorMessage = signal("");
  isLoading = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    if (!this.email?.trim()) {
      this.errorMessage.set("Email is empty");
      return;
    }

    this.isLoading.set(true);
    this.authService.login(this.email).subscribe({
      next: (response) => {
        this.router.navigate([AppRoutes.VERIFY_LOGIN], {
          state: { email: this.email }
        });
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error?.error?.message || 'OTP Send Failed');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });

  }
}
