import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseThumbnailImagesInfoComponent } from './course-thumbnail-images-info.component';

describe('CourseThumbnailImagesInfoComponent', () => {
  let component: CourseThumbnailImagesInfoComponent;
  let fixture: ComponentFixture<CourseThumbnailImagesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseThumbnailImagesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseThumbnailImagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
