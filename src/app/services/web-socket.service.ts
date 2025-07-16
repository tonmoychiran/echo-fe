import { inject, Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: Client;
  private messageSubject = new Subject<any>();
  private connectionStatus = new Subject<boolean>();
  private subscriptions: Map<string, StompSubscription> = new Map();

  private authService=inject(AuthService);

  constructor() {
    this.stompClient = new Client({
      brokerURL: `${environment.socketUrl}?token=${this.authService.getAccessToken()}`,
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      this.connectionStatus.next(true);
    };

    this.stompClient.onDisconnect = () => {
      this.connectionStatus.next(false);
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  connect(): void {
    this.stompClient.activate();
  }

  disconnect(): void {
    this.stompClient.deactivate();
    this.subscriptions.clear();
  }

  subscribeToTopic(topic: string): Observable<any> {
    const observable = new Observable<any>(observer => {
      const subscription = this.stompClient.subscribe(topic, message => {
        console.log(JSON.parse(message.body));
        observer.next(JSON.parse(message.body));
      });
      this.subscriptions.set(topic, subscription);
      return () => {
        this.unsubscribeFromTopic(topic);
      };
    });
    return observable;
  }

  unsubscribeFromTopic(topic: string): void {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  sendMessage(destination: string, message: any): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: destination,
        body: `{"message":"${message}"}`
      });
    } else {
      console.error('Cannot send message, STOMP client is not connected');
    }
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
