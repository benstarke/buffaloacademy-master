import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersinfoMgmtComponent } from './partnersinfo-mgmt.component';

describe('PartnersinfoMgmtComponent', () => {
  let component: PartnersinfoMgmtComponent;
  let fixture: ComponentFixture<PartnersinfoMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersinfoMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersinfoMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
