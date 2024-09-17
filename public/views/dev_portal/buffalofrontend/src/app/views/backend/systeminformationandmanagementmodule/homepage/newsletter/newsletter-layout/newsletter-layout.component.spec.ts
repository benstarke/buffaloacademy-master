import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterLayoutComponent } from './newsletter-layout.component';

describe('NewsletterLayoutComponent', () => {
  let component: NewsletterLayoutComponent;
  let fixture: ComponentFixture<NewsletterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
