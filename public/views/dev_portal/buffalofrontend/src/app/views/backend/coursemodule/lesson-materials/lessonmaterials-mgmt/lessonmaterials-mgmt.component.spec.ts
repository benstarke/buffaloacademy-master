import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonmaterialsMgmtComponent } from './lessonmaterials-mgmt.component';

describe('LessonmaterialsMgmtComponent', () => {
  let component: LessonmaterialsMgmtComponent;
  let fixture: ComponentFixture<LessonmaterialsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonmaterialsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonmaterialsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
