import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePicsMgmtComponent } from './user-profile-pics-mgmt.component';

describe('UserProfilePicsMgmtComponent', () => {
  let component: UserProfilePicsMgmtComponent;
  let fixture: ComponentFixture<UserProfilePicsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilePicsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfilePicsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
