import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseImagesLayoutComponent } from './course-images-layout.component';

describe('CourseImagesLayoutComponent', () => {
  let component: CourseImagesLayoutComponent;
  let fixture: ComponentFixture<CourseImagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseImagesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseImagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
