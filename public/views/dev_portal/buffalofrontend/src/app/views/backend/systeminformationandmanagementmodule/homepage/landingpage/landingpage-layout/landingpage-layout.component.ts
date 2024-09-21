import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { LandingpageInfoComponent } from '../landingpage-info/landingpage-info.component';
import { LandingpageMgmtComponent } from '../landingpage-mgmt/landingpage-mgmt.component';



@Component({
  selector: 'app-landingpage-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    LandingpageInfoComponent,
    LandingpageMgmtComponent
  ],
  templateUrl: './landingpage-layout.component.html',
  styleUrl: './landingpage-layout.component.css'
})
export class LandingpageLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'System Landing Page Information', icon: 'dx-icon-info', command: () => 'landing-page-information' },
      { label: 'System Landing Page Management', icon: 'dx-icon-settings', command: () => 'landing-page-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-landing-page/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-landing-page']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

