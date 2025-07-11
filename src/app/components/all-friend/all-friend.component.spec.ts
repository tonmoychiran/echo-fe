import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFriendComponent } from './all-friend.component';

describe('AllFriendComponent', () => {
  let component: AllFriendComponent;
  let fixture: ComponentFixture<AllFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
