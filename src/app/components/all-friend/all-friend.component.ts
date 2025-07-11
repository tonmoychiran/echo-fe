import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-all-friend',
  imports: [],
  templateUrl: './all-friend.component.html',
  styleUrl: './all-friend.component.css'
})

export class AllFriendComponent {
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


  onSearch(query: string): void {
    console.log('Search query:', query);
  }
}
