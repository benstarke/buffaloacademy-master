import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoriesLayoutComponent } from './course-categories-layout.component';

describe('CourseCategoriesLayoutComponent', () => {
  let component: CourseCategoriesLayoutComponent;
  let fixture: ComponentFixture<CourseCategoriesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoriesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCategoriesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
