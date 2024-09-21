import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddressLayoutComponent } from './company-address-layout.component';

describe('CompanyAddressLayoutComponent', () => {
  let component: CompanyAddressLayoutComponent;
  let fixture: ComponentFixture<CompanyAddressLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAddressLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAddressLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
