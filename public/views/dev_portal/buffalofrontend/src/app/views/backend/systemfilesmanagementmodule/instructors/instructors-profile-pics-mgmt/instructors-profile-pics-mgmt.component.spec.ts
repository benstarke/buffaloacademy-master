import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsProfilePicsMgmtComponent } from './instructors-profile-pics-mgmt.component';

describe('InstructorsProfilePicsMgmtComponent', () => {
  let component: InstructorsProfilePicsMgmtComponent;
  let fixture: ComponentFixture<InstructorsProfilePicsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsProfilePicsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorsProfilePicsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
