import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { PartnersInfoComponent } from '../partners-info/partners-info.component';
import { PartnersMgmtComponent } from '../partners-mgmt/partners-mgmt.component';


@Component({
  selector: 'app-partners-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    PartnersInfoComponent,
    PartnersMgmtComponent
  ],
  templateUrl: './partners-layout.component.html',
  styleUrl: './partners-layout.component.css'
})
export class PartnersLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Partners Information', icon: 'dx-icon-info', command: () => 'partners-information' },
      { label: 'Buffalo Partners Management', icon: 'dx-icon-settings', command: () => 'partners-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/general-pages/dashboard-partners/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/general-pages/dashboard-partners']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
