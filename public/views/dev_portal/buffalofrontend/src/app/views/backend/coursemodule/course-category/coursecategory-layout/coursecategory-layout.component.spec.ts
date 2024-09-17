import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecategoryLayoutComponent } from './coursecategory-layout.component';

describe('CoursecategoryLayoutComponent', () => {
  let component: CoursecategoryLayoutComponent;
  let fixture: ComponentFixture<CoursecategoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursecategoryLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursecategoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
