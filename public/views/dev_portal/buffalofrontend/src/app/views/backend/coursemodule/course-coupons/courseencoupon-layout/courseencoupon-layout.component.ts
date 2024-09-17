import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CourseencouponInfoComponent } from '../courseencoupon-info/courseencoupon-info.component';
import { CourseencouponMgmtComponent } from '../courseencoupon-mgmt/courseencoupon-mgmt.component';


@Component({
  selector: 'app-courseencoupon-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CourseencouponInfoComponent,
    CourseencouponMgmtComponent
  ],
  templateUrl: './courseencoupon-layout.component.html',
  styleUrl: './courseencoupon-layout.component.css'
})
export class CourseencouponLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Coupon Information', icon: 'dx-icon-info', command: () => 'course-coupon-information' },
      { label: 'Coupon Management', icon: 'dx-icon-settings', command: () => 'course-coupon-management' }
    ];

    this.navigate('');  // Navigate to the initial route
  }

  onTabChange(event: any) {
    const selectedItem = event.addedItems[0];
    this.selectedIndex = event.component.option('selectedIndex');
    const path = selectedItem.command ? selectedItem.command() : undefined;
    if (typeof path === 'string') {
      this.navigate(path);
    }
  }

  navigate(path: string | undefined) {
    if (path) {
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-coupons/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-coupons']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
