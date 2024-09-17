import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseenrollmentLayoutComponent } from './courseenrollment-layout.component';

describe('CourseenrollmentLayoutComponent', () => {
  let component: CourseenrollmentLayoutComponent;
  let fixture: ComponentFixture<CourseenrollmentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseenrollmentLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseenrollmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
