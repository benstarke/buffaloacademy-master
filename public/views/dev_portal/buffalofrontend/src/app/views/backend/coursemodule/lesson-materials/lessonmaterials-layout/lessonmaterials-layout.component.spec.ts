import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonmaterialsLayoutComponent } from './lessonmaterials-layout.component';

describe('LessonmaterialsLayoutComponent', () => {
  let component: LessonmaterialsLayoutComponent;
  let fixture: ComponentFixture<LessonmaterialsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonmaterialsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonmaterialsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
