import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostImagesLayoutComponent } from './blog-post-images-layout.component';

describe('BlogPostImagesLayoutComponent', () => {
  let component: BlogPostImagesLayoutComponent;
  let fixture: ComponentFixture<BlogPostImagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostImagesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPostImagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
