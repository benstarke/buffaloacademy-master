import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursetagInfoComponent } from '../coursetag-info/coursetag-info.component';
import { CoursetagMgmtComponent } from '../coursetag-mgmt/coursetag-mgmt.component';


@Component({
  selector: 'app-coursetag-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursetagInfoComponent,
    CoursetagMgmtComponent
  ],
  templateUrl: './coursetag-layout.component.html',
  styleUrl: './coursetag-layout.component.css'
})
export class CoursetagLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Course Tags Information', icon: 'dx-icon-info', command: () => 'course-tag-information' },
      { label: 'Course Tags Management', icon: 'dx-icon-settings', command: () => 'course-tag-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-tags/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-tags']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
