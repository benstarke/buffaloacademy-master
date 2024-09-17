import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffaloNewsletterComponent } from './buffalo-newsletter.component';

describe('BuffaloNewsletterComponent', () => {
  let component: BuffaloNewsletterComponent;
  let fixture: ComponentFixture<BuffaloNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffaloNewsletterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuffaloNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
