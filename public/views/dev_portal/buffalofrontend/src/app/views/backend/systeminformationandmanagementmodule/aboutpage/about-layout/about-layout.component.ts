import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';

import { AboutInfoComponent } from '../about-info/about-info.component'; 
import { AboutMgmtComponent } from '../about-mgmt/about-mgmt.component';

@Component({
  selector: 'app-about-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    AboutInfoComponent,
    AboutMgmtComponent
  ],
  templateUrl: './about-layout.component.html',
  styleUrl: './about-layout.component.css'
})
export class AboutLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'About Information', icon: 'dx-icon-info', command: () => 'about-information' },
      { label: 'About Management', icon: 'dx-icon-settings', command: () => 'about-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/about-page/dashboard-about/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/about-page/dashboard-about']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
