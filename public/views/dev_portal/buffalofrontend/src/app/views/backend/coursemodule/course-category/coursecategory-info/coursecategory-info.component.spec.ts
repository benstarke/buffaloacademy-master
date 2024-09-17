import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecategoryInfoComponent } from './coursecategory-info.component';

describe('CoursecategoryInfoComponent', () => {
  let component: CoursecategoryInfoComponent;
  let fixture: ComponentFixture<CoursecategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursecategoryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursecategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
