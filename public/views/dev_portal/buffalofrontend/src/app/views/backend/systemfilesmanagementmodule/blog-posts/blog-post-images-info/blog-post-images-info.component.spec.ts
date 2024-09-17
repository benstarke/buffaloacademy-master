import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostImagesInfoComponent } from './blog-post-images-info.component';

describe('BlogPostImagesInfoComponent', () => {
  let component: BlogPostImagesInfoComponent;
  let fixture: ComponentFixture<BlogPostImagesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostImagesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPostImagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
