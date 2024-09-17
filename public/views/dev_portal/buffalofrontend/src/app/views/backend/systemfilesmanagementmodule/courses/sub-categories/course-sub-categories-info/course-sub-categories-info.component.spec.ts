import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubCategoriesInfoComponent } from './course-sub-categories-info.component';

describe('CourseSubCategoriesInfoComponent', () => {
  let component: CourseSubCategoriesInfoComponent;
  let fixture: ComponentFixture<CourseSubCategoriesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSubCategoriesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSubCategoriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
