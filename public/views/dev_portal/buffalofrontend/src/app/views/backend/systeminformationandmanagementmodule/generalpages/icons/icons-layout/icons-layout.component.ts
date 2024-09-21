import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { IconsInfoComponent } from '../icons-info/icons-info.component';
import { IconsMgmtComponent } from '../icons-mgmt/icons-mgmt.component';


@Component({
  selector: 'app-icons-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    IconsInfoComponent,
    IconsMgmtComponent
  ],
  templateUrl: './icons-layout.component.html',
  styleUrl: './icons-layout.component.css'
})
export class IconsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'System Icons Information', icon: 'dx-icon-info', command: () => 'icons-information' },
      { label: 'System Icons Management', icon: 'dx-icon-settings', command: () => 'icons-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/general-pages/dashboard-icons/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/general-pages/dashboard-icons']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

