import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumlessonsMgmtComponent } from './curriculumlessons-mgmt.component';

describe('CurriculumlessonsMgmtComponent', () => {
  let component: CurriculumlessonsMgmtComponent;
  let fixture: ComponentFixture<CurriculumlessonsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumlessonsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumlessonsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
