import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchMgmtComponent } from './company-branch-mgmt.component';

describe('CompanyBranchMgmtComponent', () => {
  let component: CompanyBranchMgmtComponent;
  let fixture: ComponentFixture<CompanyBranchMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
