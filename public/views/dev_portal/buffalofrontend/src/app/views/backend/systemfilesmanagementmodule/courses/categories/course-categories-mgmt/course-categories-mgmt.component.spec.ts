import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoriesMgmtComponent } from './course-categories-mgmt.component';

describe('CourseCategoriesMgmtComponent', () => {
  let component: CourseCategoriesMgmtComponent;
  let fixture: ComponentFixture<CourseCategoriesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoriesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCategoriesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
