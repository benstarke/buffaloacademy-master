import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CompanyBranchesInfoComponent } from '../company-branches-info/company-branches-info.component';
import { CompanyBranchesMgmtComponent } from '../company-branches-mgmt/company-branches-mgmt.component';


@Component({
  selector: 'app-company-branches-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CompanyBranchesInfoComponent,
    CompanyBranchesMgmtComponent
  ],
  templateUrl: './company-branches-layout.component.html',
  styleUrl: './company-branches-layout.component.css'
})
export class CompanyBranchesLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Branches Information', icon: 'dx-icon-info', command: () => 'company-branches-information' },
      { label: 'Buffalo Branches Management', icon: 'dx-icon-settings', command: () => 'company-branches-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/contact-page/dashboard-company-branches/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/contact-page/dashboard-company-branches']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

