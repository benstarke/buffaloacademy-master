import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CourseenrollmentInfoComponent } from '../courseenrollment-info/courseenrollment-info.component';
import { CourseenrollmentMgmtComponent } from '../courseenrollment-mgmt/courseenrollment-mgmt.component';

@Component({
  selector: 'app-courseenrollment-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CourseenrollmentInfoComponent,
    CourseenrollmentMgmtComponent
  ],
  templateUrl: './courseenrollment-layout.component.html',
  styleUrl: './courseenrollment-layout.component.css'
})
export class CourseenrollmentLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Enrollment Information', icon: 'dx-icon-info', command: () => 'course-enrollment-information' },
      { label: 'Enrollment Management', icon: 'dx-icon-settings', command: () => 'course-enrollment-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-enrollments/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-enrollments']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
