import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';


export interface ToastState {
  message: string | null;
  type: 'success' | 'error' | 'info' | null;
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toastState = new BehaviorSubject<ToastState>({
    message: null,
    type: null,
    isVisible: false
  });

  toastState$: Observable<ToastState> = this._toastState.asObservable();

  show(message: string, type: 'success' | 'error' | 'info', duration: number = 3000): void {
    this._toastState.next({
      message,
      type,
      isVisible: true
    });

    timer(duration).subscribe(() => this.hide());
  }


  hide(): void {
    if (this._toastState.value.isVisible) {
      this._toastState.next({
        message: null,
        type: null,
        isVisible: false
      });
    }
  }
}
