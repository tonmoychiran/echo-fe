import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-update-user-name',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user-name.component.html',
  styleUrl: './update-user-name.component.css'
})
export class UpdateUserNameComponent {
  name: string = "";
  isLoading = signal(false);
  errorMessage = signal("");

  userService = inject(UserService);
  router = inject(Router);

  onSubmit() {
    if (!this.name?.trim()) {
      this.errorMessage.set("Name is emtpy");
      return;
    }

    this.isLoading.set(true);

    this.userService.updateUserName(this.name).subscribe({
      next: (response) => {
        this.router.navigate([AppRoutes.REGISTER_DOB]);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error?.error?.message || "Name update failed");
      },
      complete: () => {
        this.isLoading.set(false);

      }
    })
  }

}
