import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLayoutComponent } from './email-layout.component';

describe('EmailLayoutComponent', () => {
  let component: EmailLayoutComponent;
  let fixture: ComponentFixture<EmailLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
