import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecategoryMgmtComponent } from './coursecategory-mgmt.component';

describe('CoursecategoryMgmtComponent', () => {
  let component: CoursecategoryMgmtComponent;
  let fixture: ComponentFixture<CoursecategoryMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursecategoryMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursecategoryMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
