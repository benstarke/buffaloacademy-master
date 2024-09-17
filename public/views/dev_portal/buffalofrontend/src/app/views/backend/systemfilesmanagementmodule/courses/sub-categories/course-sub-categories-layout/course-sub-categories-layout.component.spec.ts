import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubCategoriesLayoutComponent } from './course-sub-categories-layout.component';

describe('CourseSubCategoriesLayoutComponent', () => {
  let component: CourseSubCategoriesLayoutComponent;
  let fixture: ComponentFixture<CourseSubCategoriesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSubCategoriesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSubCategoriesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
