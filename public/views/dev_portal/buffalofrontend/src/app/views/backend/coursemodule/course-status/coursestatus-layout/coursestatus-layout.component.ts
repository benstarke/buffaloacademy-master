import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursestatusInfoComponent } from '../coursestatus-info/coursestatus-info.component';
import { CoursestatusMgmtComponent } from '../coursestatus-mgmt/coursestatus-mgmt.component';


@Component({
  selector: 'app-coursestatus-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursestatusInfoComponent,
    CoursestatusMgmtComponent
  ],
  templateUrl: './coursestatus-layout.component.html',
  styleUrl: './coursestatus-layout.component.css'
})
export class CoursestatusLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Course Status Information', icon: 'dx-icon-info', command: () => 'course-status-information' },
      { label: 'Course Status Management', icon: 'dx-icon-settings', command: () => 'course-status-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-status/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-status']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
