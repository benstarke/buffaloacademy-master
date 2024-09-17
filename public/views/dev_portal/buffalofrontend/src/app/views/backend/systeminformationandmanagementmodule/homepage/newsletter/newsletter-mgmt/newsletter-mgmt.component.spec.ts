import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterMgmtComponent } from './newsletter-mgmt.component';

describe('NewsletterMgmtComponent', () => {
  let component: NewsletterMgmtComponent;
  let fixture: ComponentFixture<NewsletterMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
