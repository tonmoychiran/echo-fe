import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-chat-list',
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  chatRoute=AppRoutes.CHAT;
}
