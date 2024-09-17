import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePicsInfoComponent } from './user-profile-pics-info.component';

describe('UserProfilePicsInfoComponent', () => {
  let component: UserProfilePicsInfoComponent;
  let fixture: ComponentFixture<UserProfilePicsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilePicsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfilePicsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
