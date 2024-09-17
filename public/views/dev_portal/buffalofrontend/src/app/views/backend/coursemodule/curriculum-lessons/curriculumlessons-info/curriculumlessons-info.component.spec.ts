import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumlessonsInfoComponent } from './curriculumlessons-info.component';

describe('CurriculumlessonsInfoComponent', () => {
  let component: CurriculumlessonsInfoComponent;
  let fixture: ComponentFixture<CurriculumlessonsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumlessonsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumlessonsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
