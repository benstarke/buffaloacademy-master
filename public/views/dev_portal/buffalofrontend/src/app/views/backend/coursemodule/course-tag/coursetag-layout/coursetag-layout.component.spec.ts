import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetagLayoutComponent } from './coursetag-layout.component';

describe('CoursetagLayoutComponent', () => {
  let component: CoursetagLayoutComponent;
  let fixture: ComponentFixture<CoursetagLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursetagLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursetagLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
