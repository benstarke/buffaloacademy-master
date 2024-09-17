import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseThumbnailImagesMgmtComponent } from './course-thumbnail-images-mgmt.component';

describe('CourseThumbnailImagesMgmtComponent', () => {
  let component: CourseThumbnailImagesMgmtComponent;
  let fixture: ComponentFixture<CourseThumbnailImagesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseThumbnailImagesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseThumbnailImagesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
