import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddressMgmtComponent } from './company-address-mgmt.component';

describe('CompanyAddressMgmtComponent', () => {
  let component: CompanyAddressMgmtComponent;
  let fixture: ComponentFixture<CompanyAddressMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAddressMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAddressMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
