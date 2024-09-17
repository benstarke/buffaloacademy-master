import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursestatusInfoComponent } from './coursestatus-info.component';

describe('CoursestatusInfoComponent', () => {
  let component: CoursestatusInfoComponent;
  let fixture: ComponentFixture<CoursestatusInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursestatusInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursestatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
