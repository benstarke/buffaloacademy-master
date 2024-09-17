import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursestatusLayoutComponent } from './coursestatus-layout.component';

describe('CoursestatusLayoutComponent', () => {
  let component: CoursestatusLayoutComponent;
  let fixture: ComponentFixture<CoursestatusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursestatusLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursestatusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
