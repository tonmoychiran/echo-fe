import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineFriendComponent } from './online-friend.component';

describe('OnlineFriendComponent', () => {
  let component: OnlineFriendComponent;
  let fixture: ComponentFixture<OnlineFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
