import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseenrollmentInfoComponent } from './courseenrollment-info.component';

describe('CourseenrollmentInfoComponent', () => {
  let component: CourseenrollmentInfoComponent;
  let fixture: ComponentFixture<CourseenrollmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseenrollmentInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseenrollmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
