import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecurriculumMgmtComponent } from './coursecurriculum-mgmt.component';

describe('CoursecurriculumMgmtComponent', () => {
  let component: CoursecurriculumMgmtComponent;
  let fixture: ComponentFixture<CoursecurriculumMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursecurriculumMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursecurriculumMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
