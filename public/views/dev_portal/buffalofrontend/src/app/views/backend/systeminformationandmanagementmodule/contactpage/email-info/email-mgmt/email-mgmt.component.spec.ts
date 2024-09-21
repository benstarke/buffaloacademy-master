import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMgmtComponent } from './email-mgmt.component';

describe('EmailMgmtComponent', () => {
  let component: EmailMgmtComponent;
  let fixture: ComponentFixture<EmailMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
