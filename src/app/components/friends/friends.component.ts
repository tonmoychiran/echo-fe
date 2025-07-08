import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-friends',
  imports: [CommonModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  selectedTab = signal<'online' | 'all' | 'add'>('online');

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(400),
        map((event: Event) => (event.target as HTMLInputElement).value)
      )
      .subscribe((query: string) => {
        this.onSearch(query);
      });
  }

  selectTab(tabName: 'online' | 'all' | 'add') {
    this.selectedTab.set(tabName);
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
  }
}
