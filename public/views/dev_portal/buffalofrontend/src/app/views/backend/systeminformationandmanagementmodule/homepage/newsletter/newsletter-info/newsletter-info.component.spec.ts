import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterInfoComponent } from './newsletter-info.component';

describe('NewsletterInfoComponent', () => {
  let component: NewsletterInfoComponent;
  let fixture: ComponentFixture<NewsletterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
