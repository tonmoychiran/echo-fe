import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastService, ToastState } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {
  toastState!: ToastState;
  private toastSubscription!: Subscription;

  private toastService = inject(ToastService);

  ngOnInit() {
    this.toastSubscription = this.toastService.toastState$.subscribe(state => {
      this.toastState = state;
    });
  }

  hideToast(): void {
    this.toastService.hide();
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}
