import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseImagesInfoComponent } from './course-images-info.component';

describe('CourseImagesInfoComponent', () => {
  let component: CourseImagesInfoComponent;
  let fixture: ComponentFixture<CourseImagesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseImagesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseImagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
