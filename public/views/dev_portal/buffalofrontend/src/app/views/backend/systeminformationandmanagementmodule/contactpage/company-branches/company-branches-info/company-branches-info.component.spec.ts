import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchesInfoComponent } from './company-branches-info.component';

describe('CompanyBranchesInfoComponent', () => {
  let component: CompanyBranchesInfoComponent;
  let fixture: ComponentFixture<CompanyBranchesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
