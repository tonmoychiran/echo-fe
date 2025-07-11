import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-online-friend',
  imports: [],
  templateUrl: './online-friend.component.html',
  styleUrl: './online-friend.component.css'
})
export class OnlineFriendComponent {
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
