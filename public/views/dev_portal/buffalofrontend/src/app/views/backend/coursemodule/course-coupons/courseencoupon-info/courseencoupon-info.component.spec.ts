import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseencouponInfoComponent } from './courseencoupon-info.component';

describe('CourseencouponInfoComponent', () => {
  let component: CourseencouponInfoComponent;
  let fixture: ComponentFixture<CourseencouponInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseencouponInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseencouponInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
