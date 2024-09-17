import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursesubcategoryInfoComponent } from '../coursesubcategory-info/coursesubcategory-info.component';
import { CoursesubcategoryMgmtComponent } from '../coursesubcategory-mgmt/coursesubcategory-mgmt.component';

@Component({
  selector: 'app-coursesubcategory-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursesubcategoryInfoComponent,
    CoursesubcategoryMgmtComponent
  ],
  templateUrl: './coursesubcategory-layout.component.html',
  styleUrl: './coursesubcategory-layout.component.css'
})
export class CoursesubcategoryLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Sub-category Information', icon: 'dx-icon-info', command: () => 'course-sub-category-information' },
      { label: 'Sub-category Management', icon: 'dx-icon-settings', command: () => 'course-sub-category-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-sub-categories/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-sub-categories']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
