import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-update-user-dob',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user-dob.component.html',
  styleUrl: './update-user-dob.component.css'
})
export class UpdateUserDobComponent {
  isLoading = signal(false);
  errorMessage = signal("");

  selectedYear: number | string = "";
  selectedMonth: number | string = "";
  selectedDay: number | string = "";

  years: WritableSignal<number[]> = signal([]);
  currentYear: WritableSignal<number> = signal(new Date().getFullYear());
  endYear: WritableSignal<number> = signal(new Date("1900-01-01").getFullYear());

  months = signal([
    { id: 1, label: "January" },
    { id: 2, label: "February" },
    { id: 3, label: "March" },
    { id: 4, label: "April" },
    { id: 5, label: "May" },
    { id: 6, label: "June" },
    { id: 7, label: "July" },
    { id: 8, label: "August" },
    { id: 9, label: "September" },
    { id: 10, label: "October" },
    { id: 11, label: "November" },
    { id: 12, label: "December" }
  ]);

  days = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]);

  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    this.generateYears();
  }

  generateYears() {
    const start = this.currentYear() - 3;
    const end = this.endYear();
    const availableYears = [];

    for (let i = start; i >= end; i--) {
      availableYears.push(i);
    }

    this.years.set(availableYears);
  }

  updateDays() {
    const year = Number(this.selectedYear);
    const month = Number(this.selectedMonth);

    if (isNaN(year) || isNaN(month) || year === 0 || month === 0) {
      return;
    }

    const lastDateOfTheMonth = new Date(year, month, 0).getDate();
    let dates = [];
    for (let i = 1; i <= lastDateOfTheMonth; i++) {
      dates.push(i);
    }
    this.days.set(dates);
  };

  onSubmit() {
    const year = Number(this.selectedYear);
    const month = Number(this.selectedMonth);
    const day = Number(this.selectedDay);
    if (isNaN(year) || isNaN(month) || isNaN(day) || year === 0 || month === 0 || day === 0) {
      this.errorMessage.set('Ivalid date');
      return;
    }

    this.isLoading.set(true);

    const dob = `${year}-${month}-${day}`;
    this.userService.updateUserDOB(dob).subscribe({
      next: (response) => {
        this.router.navigate([AppRoutes.ONLINE_FRIENDS]);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error?.error?.message || "Date Of Birth update failed");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }
}
