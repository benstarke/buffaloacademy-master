import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchInfoComponent } from './company-branch-info.component';

describe('CompanyBranchInfoComponent', () => {
  let component: CompanyBranchInfoComponent;
  let fixture: ComponentFixture<CompanyBranchInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
