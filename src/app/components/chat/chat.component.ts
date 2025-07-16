import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  text: string = '';
  isLoadingData: boolean = false; 

  constructor() {}


  onSubmit(): void {

  }

  isEmptyInput(): boolean {
    return this.text.trim().length === 0;
  }

  isSubmitDisabled(): boolean {
    return  this.isEmptyInput() || this.isLoadingData;
  }
}
