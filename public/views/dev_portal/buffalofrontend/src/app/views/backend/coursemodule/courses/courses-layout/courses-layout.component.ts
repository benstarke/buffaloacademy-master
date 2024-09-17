import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursesInfoComponent } from '../courses-info/courses-info.component';
import { CoursesMgmtComponent } from '../courses-mgmt/courses-mgmt.component';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursesInfoComponent,
    CoursesMgmtComponent
  ],
  templateUrl: './courses-layout.component.html',
  styleUrl: './courses-layout.component.css'
})
export class CoursesLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Course Information', icon: 'dx-icon-info', command: () => 'course-information' },
      { label: 'Course Management', icon: 'dx-icon-settings', command: () => 'course-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-courses/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-courses']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
