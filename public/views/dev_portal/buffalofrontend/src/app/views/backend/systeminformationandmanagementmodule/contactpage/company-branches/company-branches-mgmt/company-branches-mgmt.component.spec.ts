import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchesMgmtComponent } from './company-branches-mgmt.component';

describe('CompanyBranchesMgmtComponent', () => {
  let component: CompanyBranchesMgmtComponent;
  let fixture: ComponentFixture<CompanyBranchesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
