import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { PermissionInfoComponent } from '../permission-info/permission-info.component';
import { PermissionMgmtComponent } from '../permission-mgmt/permission-mgmt.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    PermissionInfoComponent,
    PermissionMgmtComponent
  ],
  templateUrl: './permission-layout.component.html',
  styleUrls: ['./permission-layout.component.css']
})

export class PermissionLayoutComponent implements OnInit {

  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Permission Information', icon: 'dx-icon-info', command: () => 'permission-information' },
      { label: 'Permission Management', icon: 'dx-icon-settings', command: () => 'permission-management' }
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
      this.router.navigate([`/admin-buffalo/student-instructor-courses/permission-dashboard/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/student-instructor-courses/permission-dashboard']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

