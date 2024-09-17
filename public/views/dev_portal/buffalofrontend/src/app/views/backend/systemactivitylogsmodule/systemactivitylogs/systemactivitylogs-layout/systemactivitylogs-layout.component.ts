import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { SystemactivitylogsInfoComponent } from '../systemactivitylogs-info/systemactivitylogs-info.component';  
import { SystemactivitylogsMgmtComponent } from '../systemactivitylogs-mgmt/systemactivitylogs-mgmt.component'; 


@Component({
  selector: 'app-systemactivitylogs-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    SystemactivitylogsInfoComponent,
    SystemactivitylogsMgmtComponent
  ],
  templateUrl: './systemactivitylogs-layout.component.html',
  styleUrl: './systemactivitylogs-layout.component.css'
})
export class SystemactivitylogsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Activity & Logs Information', icon: 'dx-icon-info', command: () => 'system-activity-logs-information' },
      // { label: 'Activity & Logs Management', icon: 'dx-icon-settings', command: () => 'system-activity-logs-management' }
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
      this.router.navigate([`/admin-buffalo/system-activity-and-logs/dashboard-system-activity-logs/${path}`]);
    } 
    // else {
    //   this.router.navigate(['/admin-buffalo/system-activity-and-logs/dashboard-system-activity-logs']);
    // }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

