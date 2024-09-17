import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecurriculumLayoutComponent } from './coursecurriculum-layout.component';

describe('CoursecurriculumLayoutComponent', () => {
  let component: CoursecurriculumLayoutComponent;
  let fixture: ComponentFixture<CoursecurriculumLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursecurriculumLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursecurriculumLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
