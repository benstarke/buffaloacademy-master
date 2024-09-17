import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMgmtComponent } from './footer-mgmt.component';

describe('FooterMgmtComponent', () => {
  let component: FooterMgmtComponent;
  let fixture: ComponentFixture<FooterMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
