import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { RoleInfoComponent } from '../role-info/role-info.component';  
import { RoleMgmtComponent } from '../role-mgmt/role-mgmt.component'; 

@Component({
  selector: 'app-role-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    RoleInfoComponent,
    RoleMgmtComponent
  ],
  templateUrl: './role-layout.component.html',
  styleUrl: './role-layout.component.css'
})
export class RoleLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Role Information', icon: 'dx-icon-info', command: () => 'role-information' },
      { label: 'Role Management', icon: 'dx-icon-settings', command: () => 'role-management' }
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
      this.router.navigate([`/admin-buffalo/student-instructor-courses/role-dashboard/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/student-instructor-courses/role-dashboard']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
