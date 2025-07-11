import { Component, inject } from '@angular/core';
import { ChatListComponent } from "../chat-list/chat-list.component";
import { UserSectionComponent } from "../user-section/user-section.component";
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ChatListComponent, UserSectionComponent, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
