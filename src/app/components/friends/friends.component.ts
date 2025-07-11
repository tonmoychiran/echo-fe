import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import {  RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-friends',
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {

}
