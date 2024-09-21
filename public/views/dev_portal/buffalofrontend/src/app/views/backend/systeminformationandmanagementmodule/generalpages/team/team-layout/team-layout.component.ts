import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { TeamInfoComponent } from '../team-info/team-info.component';
import { TeamMgmtComponent } from '../team-mgmt/team-mgmt.component';


@Component({
  selector: 'app-team-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    TeamInfoComponent,
    TeamMgmtComponent
  ],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.css'
})
export class TeamLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Team Information', icon: 'dx-icon-info', command: () => 'team-information' },
      { label: 'Buffalo Team Management', icon: 'dx-icon-settings', command: () => 'team-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/general-pages/dashboard-team/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/general-pages/dashboard-team']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

