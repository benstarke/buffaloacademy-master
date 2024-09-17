import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonmaterialsInfoComponent } from './lessonmaterials-info.component';

describe('LessonmaterialsInfoComponent', () => {
  let component: LessonmaterialsInfoComponent;
  let fixture: ComponentFixture<LessonmaterialsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonmaterialsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonmaterialsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
