import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { AppCurrenciesInfoComponent } from '../app-currencies-info/app-currencies-info.component';
import { AppCurrenciesMgmtComponent } from '../app-currencies-mgmt/app-currencies-mgmt.component';

@Component({
  selector: 'app-app-currencies-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    AppCurrenciesInfoComponent,
    AppCurrenciesMgmtComponent
  ],
  templateUrl: './app-currencies-layout.component.html',
  styleUrl: './app-currencies-layout.component.css'
})
export class AppCurrenciesLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'App Currency Information', icon: 'dx-icon-info', command: () => 'app-currency-information' },
      { label: 'App Currency Management', icon: 'dx-icon-settings', command: () => 'app-currency-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-app-currency/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-app-currency']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
