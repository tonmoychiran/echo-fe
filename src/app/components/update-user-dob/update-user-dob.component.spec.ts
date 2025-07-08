import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDobComponent } from './update-user-dob.component';

describe('UpdateUserDobComponent', () => {
  let component: UpdateUserDobComponent;
  let fixture: ComponentFixture<UpdateUserDobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserDobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserDobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
