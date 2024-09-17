import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesubcategoryInfoComponent } from './coursesubcategory-info.component';

describe('CoursesubcategoryInfoComponent', () => {
  let component: CoursesubcategoryInfoComponent;
  let fixture: ComponentFixture<CoursesubcategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesubcategoryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesubcategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
