import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseImagesMgmtComponent } from './course-images-mgmt.component';

describe('CourseImagesMgmtComponent', () => {
  let component: CourseImagesMgmtComponent;
  let fixture: ComponentFixture<CourseImagesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseImagesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseImagesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
