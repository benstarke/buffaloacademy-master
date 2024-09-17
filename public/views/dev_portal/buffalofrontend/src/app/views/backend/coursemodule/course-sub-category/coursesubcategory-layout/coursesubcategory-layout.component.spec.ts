import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesubcategoryLayoutComponent } from './coursesubcategory-layout.component';

describe('CoursesubcategoryLayoutComponent', () => {
  let component: CoursesubcategoryLayoutComponent;
  let fixture: ComponentFixture<CoursesubcategoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesubcategoryLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesubcategoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
