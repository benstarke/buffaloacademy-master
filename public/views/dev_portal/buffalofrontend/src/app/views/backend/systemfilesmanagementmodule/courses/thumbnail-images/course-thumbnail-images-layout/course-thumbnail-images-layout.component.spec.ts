import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseThumbnailImagesLayoutComponent } from './course-thumbnail-images-layout.component';

describe('CourseThumbnailImagesLayoutComponent', () => {
  let component: CourseThumbnailImagesLayoutComponent;
  let fixture: ComponentFixture<CourseThumbnailImagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseThumbnailImagesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseThumbnailImagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
