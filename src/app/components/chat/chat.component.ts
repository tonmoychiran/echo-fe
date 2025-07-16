import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  text: string = '';
  isLoadingData: boolean = false;
  messages: any[] = [];
  chatId: string | null = null;
  isConnected: boolean = false;
  private wsSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;


  private webSocketService = inject(WebSocketService);
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.chatId = params.get('chatId');
      if (this.chatId) {
        this.connectWebSocket();
      } else {
        console.error('No chatId found in route parameters');
      }
    });
  }


  connectWebSocket(): void {
    this.webSocketService.connect();

    // this.webSocketService.getConnectionStatus().subscribe(connected => {
    //   this.isConnected = connected;
    //   if (connected && this.chatId) {
    //     this.wsSubscription = this.webSocketService.subscribeToTopic(`/inbox/`)
    //       .subscribe(message => {
    //         this.messages.push({ ...message, isSent: false });
    //       });
    //   }
    // });

   
  }


  onSubmit(): void {
    // if (!this.isSubmitDisabled() && this.chatId) {
    //   this.isLoadingData = true;
    //   this.webSocketService.sendMessage(`/app/message/${this.chatId}`, this.text);
    //   this.text = '';
    //   this.isLoadingData = false;
    // }
  }

  isEmptyInput(): boolean {
    return this.text.trim().length === 0;
  }

  isSubmitDisabled(): boolean {
    return this.isEmptyInput() || this.isLoadingData;
  }

  ngOnDestroy(): void {
    // if (this.chatId) {
    //   this.webSocketService.unsubscribeFromTopic(`/topic/${this.chatId}`);
    // }
    // this.webSocketService.disconnect();
    // if (this.wsSubscription) {
    //   this.wsSubscription.unsubscribe();
    // }
    // if (this.routeSubscription) {
    //   this.routeSubscription.unsubscribe();
    // }
  }
}
