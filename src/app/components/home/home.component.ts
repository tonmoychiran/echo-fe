import { Component } from '@angular/core';
import { ChatListComponent } from "../chat-list/chat-list.component";
import { UserSectionComponent } from "../user-section/user-section.component";
import { FriendsComponent } from "../friends/friends.component";

@Component({
  selector: 'app-home',
  imports: [ChatListComponent, UserSectionComponent, FriendsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
