import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { FooterInfoComponent } from '../footer-info/footer-info.component';
import { FooterMgmtComponent } from '../footer-mgmt/footer-mgmt.component';


@Component({
  selector: 'app-footer-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    FooterInfoComponent,
    FooterMgmtComponent
  ],
  templateUrl: './footer-layout.component.html',
  styleUrl: './footer-layout.component.css'
})
export class FooterLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'System Footer Information', icon: 'dx-icon-info', command: () => 'footer-information' },
      { label: 'System Footer Management', icon: 'dx-icon-settings', command: () => 'footer-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/general-pages/dashboard-footer/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/general-pages/dashboard-footer']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

