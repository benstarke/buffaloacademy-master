import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecurriculumInfoComponent } from './coursecurriculum-info.component';

describe('CoursecurriculumInfoComponent', () => {
  let component: CoursecurriculumInfoComponent;
  let fixture: ComponentFixture<CoursecurriculumInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursecurriculumInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursecurriculumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
