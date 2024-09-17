import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubCategoriesMgmtComponent } from './course-sub-categories-mgmt.component';

describe('CourseSubCategoriesMgmtComponent', () => {
  let component: CourseSubCategoriesMgmtComponent;
  let fixture: ComponentFixture<CourseSubCategoriesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSubCategoriesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSubCategoriesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
