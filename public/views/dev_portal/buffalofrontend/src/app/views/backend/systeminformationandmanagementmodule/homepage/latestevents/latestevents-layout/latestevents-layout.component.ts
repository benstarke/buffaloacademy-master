import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { LatesteventsInfoComponent } from '../latestevents-info/latestevents-info.component';
import { LatesteventsMgmtComponent } from '../latestevents-mgmt/latestevents-mgmt.component';



@Component({
  selector: 'app-latestevents-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    LatesteventsInfoComponent,
    LatesteventsMgmtComponent
  ],
  templateUrl: './latestevents-layout.component.html',
  styleUrl: './latestevents-layout.component.css'
})
export class LatesteventsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'System Latest Events Information', icon: 'dx-icon-info', command: () => 'latest-events-information' },
      { label: 'System Latest Events Management', icon: 'dx-icon-settings', command: () => 'latest-events-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-latest-events/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-latest-events']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
