import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesubcategoryMgmtComponent } from './coursesubcategory-mgmt.component';

describe('CoursesubcategoryMgmtComponent', () => {
  let component: CoursesubcategoryMgmtComponent;
  let fixture: ComponentFixture<CoursesubcategoryMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesubcategoryMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesubcategoryMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
