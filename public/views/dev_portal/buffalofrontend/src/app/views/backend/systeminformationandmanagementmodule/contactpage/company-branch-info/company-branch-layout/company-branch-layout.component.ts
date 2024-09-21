import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CompanyBranchInfoComponent } from '../company-branch-info/company-branch-info.component';
import { CompanyBranchMgmtComponent } from '../company-branch-mgmt/company-branch-mgmt.component';


@Component({
  selector: 'app-company-branch-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CompanyBranchInfoComponent,
    CompanyBranchMgmtComponent
  ],
  templateUrl: './company-branch-layout.component.html',
  styleUrl: './company-branch-layout.component.css'
})
export class CompanyBranchLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Branch Profile Information', icon: 'dx-icon-info', command: () => 'company-branch-information' },
      { label: 'Buffalo Branch Profile Management', icon: 'dx-icon-settings', command: () => 'company-branch-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/contact-page/dashboard-company-branch/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/contact-page/dashboard-company-branch']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
