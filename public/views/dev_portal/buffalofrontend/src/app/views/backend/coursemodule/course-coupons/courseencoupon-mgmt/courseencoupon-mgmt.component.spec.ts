import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseencouponMgmtComponent } from './courseencoupon-mgmt.component';

describe('CourseencouponMgmtComponent', () => {
  let component: CourseencouponMgmtComponent;
  let fixture: ComponentFixture<CourseencouponMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseencouponMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseencouponMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
