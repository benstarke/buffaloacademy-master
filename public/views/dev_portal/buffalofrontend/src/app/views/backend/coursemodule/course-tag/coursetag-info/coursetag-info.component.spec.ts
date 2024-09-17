import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetagInfoComponent } from './coursetag-info.component';

describe('CoursetagInfoComponent', () => {
  let component: CoursetagInfoComponent;
  let fixture: ComponentFixture<CoursetagInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursetagInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursetagInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
