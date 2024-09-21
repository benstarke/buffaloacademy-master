import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersMgmtComponent } from './partners-mgmt.component';

describe('PartnersMgmtComponent', () => {
  let component: PartnersMgmtComponent;
  let fixture: ComponentFixture<PartnersMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
