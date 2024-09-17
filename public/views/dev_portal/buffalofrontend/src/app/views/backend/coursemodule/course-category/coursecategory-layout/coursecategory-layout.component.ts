import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursecategoryInfoComponent } from '../coursecategory-info/coursecategory-info.component';
import { CoursecategoryMgmtComponent } from '../coursecategory-mgmt/coursecategory-mgmt.component';


@Component({
  selector: 'app-coursecategory-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursecategoryInfoComponent,
    CoursecategoryMgmtComponent
  ],
  templateUrl: './coursecategory-layout.component.html',
  styleUrl: './coursecategory-layout.component.css'
})
export class CoursecategoryLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Course Category Information', icon: 'dx-icon-info', command: () => 'course-category-information' },
      { label: 'Course Category Management', icon: 'dx-icon-settings', command: () => 'course-category-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-categories/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-categories']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
