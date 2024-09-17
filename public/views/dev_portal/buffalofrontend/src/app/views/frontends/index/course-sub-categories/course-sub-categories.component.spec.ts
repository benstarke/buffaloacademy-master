import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubCategoriesComponent } from './course-sub-categories.component';

describe('CourseSubCategoriesComponent', () => {
  let component: CourseSubCategoriesComponent;
  let fixture: ComponentFixture<CourseSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSubCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
