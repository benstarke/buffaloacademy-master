import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetagMgmtComponent } from './coursetag-mgmt.component';

describe('CoursetagMgmtComponent', () => {
  let component: CoursetagMgmtComponent;
  let fixture: ComponentFixture<CoursetagMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursetagMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursetagMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
