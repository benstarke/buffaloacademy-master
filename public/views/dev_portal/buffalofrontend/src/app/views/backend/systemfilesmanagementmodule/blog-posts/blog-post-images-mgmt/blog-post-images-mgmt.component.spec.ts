import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostImagesMgmtComponent } from './blog-post-images-mgmt.component';

describe('BlogPostImagesMgmtComponent', () => {
  let component: BlogPostImagesMgmtComponent;
  let fixture: ComponentFixture<BlogPostImagesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostImagesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPostImagesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
