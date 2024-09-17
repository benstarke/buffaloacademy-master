import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoriesInfoComponent } from './course-categories-info.component';

describe('CourseCategoriesInfoComponent', () => {
  let component: CourseCategoriesInfoComponent;
  let fixture: ComponentFixture<CourseCategoriesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoriesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCategoriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
