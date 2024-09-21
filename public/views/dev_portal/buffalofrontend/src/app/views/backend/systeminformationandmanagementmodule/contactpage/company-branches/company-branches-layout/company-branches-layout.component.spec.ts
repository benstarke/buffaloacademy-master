import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchesLayoutComponent } from './company-branches-layout.component';

describe('CompanyBranchesLayoutComponent', () => {
  let component: CompanyBranchesLayoutComponent;
  let fixture: ComponentFixture<CompanyBranchesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
