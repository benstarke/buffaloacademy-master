import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseencouponLayoutComponent } from './courseencoupon-layout.component';

describe('CourseencouponLayoutComponent', () => {
  let component: CourseencouponLayoutComponent;
  let fixture: ComponentFixture<CourseencouponLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseencouponLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseencouponLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
