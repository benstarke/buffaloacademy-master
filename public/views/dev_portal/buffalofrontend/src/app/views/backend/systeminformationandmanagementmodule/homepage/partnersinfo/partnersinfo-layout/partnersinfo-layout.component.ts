import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { PartnersinfoInfoComponent } from '../partnersinfo-info/partnersinfo-info.component';
import { PartnersinfoMgmtComponent } from '../partnersinfo-mgmt/partnersinfo-mgmt.component';


@Component({
  selector: 'app-partnersinfo-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    PartnersinfoInfoComponent,
    PartnersinfoMgmtComponent
  ],
  templateUrl: './partnersinfo-layout.component.html',
  styleUrl: './partnersinfo-layout.component.css'
})
export class PartnersinfoLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Partners Information', icon: 'dx-icon-info', command: () => 'partners-information-information' },
      { label: 'Buffalo Partners Management', icon: 'dx-icon-settings', command: () => 'partners-information-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-partners-information/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-partners-information']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
