import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddressInfoComponent } from './company-address-info.component';

describe('CompanyAddressInfoComponent', () => {
  let component: CompanyAddressInfoComponent;
  let fixture: ComponentFixture<CompanyAddressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAddressInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
