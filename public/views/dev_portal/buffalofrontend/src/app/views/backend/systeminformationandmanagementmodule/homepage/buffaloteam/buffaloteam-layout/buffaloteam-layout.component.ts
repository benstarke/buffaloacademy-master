import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { BuffaloteamInfoComponent } from '../buffaloteam-info/buffaloteam-info.component';
import { BuffaloteamMgmtComponent } from '../buffaloteam-mgmt/buffaloteam-mgmt.component';


@Component({
  selector: 'app-buffaloteam-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    BuffaloteamInfoComponent,
    BuffaloteamMgmtComponent
  ],
  templateUrl: './buffaloteam-layout.component.html',
  styleUrl: './buffaloteam-layout.component.css'
})
export class BuffaloteamLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Team Information', icon: 'dx-icon-info', command: () => 'buffalo-team-information' },
      { label: 'Buffalo Team Management', icon: 'dx-icon-settings', command: () => 'buffalo-team-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/about-page/dashboard-buffalo-team/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/about-page/dashboard-buffalo-team']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
