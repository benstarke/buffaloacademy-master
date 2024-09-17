import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePicsLayoutComponent } from './user-profile-pics-layout.component';

describe('UserProfilePicsLayoutComponent', () => {
  let component: UserProfilePicsLayoutComponent;
  let fixture: ComponentFixture<UserProfilePicsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilePicsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfilePicsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
