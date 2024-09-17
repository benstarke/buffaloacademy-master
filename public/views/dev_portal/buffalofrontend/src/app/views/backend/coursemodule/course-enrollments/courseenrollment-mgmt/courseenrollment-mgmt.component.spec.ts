import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseenrollmentMgmtComponent } from './courseenrollment-mgmt.component';

describe('CourseenrollmentMgmtComponent', () => {
  let component: CourseenrollmentMgmtComponent;
  let fixture: ComponentFixture<CourseenrollmentMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseenrollmentMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseenrollmentMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
