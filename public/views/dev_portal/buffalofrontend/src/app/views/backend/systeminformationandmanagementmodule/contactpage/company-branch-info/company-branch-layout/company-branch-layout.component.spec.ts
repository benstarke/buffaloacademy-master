import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchLayoutComponent } from './company-branch-layout.component';

describe('CompanyBranchLayoutComponent', () => {
  let component: CompanyBranchLayoutComponent;
  let fixture: ComponentFixture<CompanyBranchLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
