import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumlessonsLayoutComponent } from './curriculumlessons-layout.component';

describe('CurriculumlessonsLayoutComponent', () => {
  let component: CurriculumlessonsLayoutComponent;
  let fixture: ComponentFixture<CurriculumlessonsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumlessonsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumlessonsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
