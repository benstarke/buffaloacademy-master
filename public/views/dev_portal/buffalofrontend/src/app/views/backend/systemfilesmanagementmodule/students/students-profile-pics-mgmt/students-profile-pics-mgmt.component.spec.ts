import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsProfilePicsMgmtComponent } from './students-profile-pics-mgmt.component';

describe('StudentsProfilePicsMgmtComponent', () => {
  let component: StudentsProfilePicsMgmtComponent;
  let fixture: ComponentFixture<StudentsProfilePicsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsProfilePicsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsProfilePicsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
