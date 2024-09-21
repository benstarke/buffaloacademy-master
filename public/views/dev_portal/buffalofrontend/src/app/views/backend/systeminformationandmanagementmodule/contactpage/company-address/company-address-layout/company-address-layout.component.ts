import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CompanyAddressInfoComponent } from '../company-address-info/company-address-info.component';
import { CompanyAddressMgmtComponent } from '../company-address-mgmt/company-address-mgmt.component';



@Component({
  selector: 'app-company-address-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CompanyAddressInfoComponent,
    CompanyAddressMgmtComponent
  ],
  templateUrl: './company-address-layout.component.html',
  styleUrl: './company-address-layout.component.css'
})
export class CompanyAddressLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Address Information', icon: 'dx-icon-info', command: () => 'company-address-information' },
      { label: 'Buffalo Address Management', icon: 'dx-icon-settings', command: () => 'company-address-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/contact-page/dashboard-company-address/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/contact-page/dashboard-company-address']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

