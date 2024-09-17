import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { SystemaudittrailInfoComponent } from '../systemaudittrail-info/systemaudittrail-info.component'; 
import { SystemaudittrailMgmtComponent } from '../systemaudittrail-mgmt/systemaudittrail-mgmt.component';


@Component({
  selector: 'app-systemaudittrail-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    SystemaudittrailInfoComponent,
    SystemaudittrailMgmtComponent
  ],
  templateUrl: './systemaudittrail-layout.component.html',
  styleUrl: './systemaudittrail-layout.component.css'
})
export class SystemaudittrailLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Audit Trails Information', icon: 'dx-icon-info', command: () => 'system-audit-trail-information' },
      // { label: 'Audit Trails Management', icon: 'dx-icon-settings', command: () => 'system-audit-trail-management' }
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
      this.router.navigate([`/admin-buffalo/system-activity-and-logs/dashboard-system-audit-trail/${path}`]);
    } 
    // else {
    //   this.router.navigate(['/admin-buffalo/system-activity-and-logs/dashboard-system-audit-trail']);
    // }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
