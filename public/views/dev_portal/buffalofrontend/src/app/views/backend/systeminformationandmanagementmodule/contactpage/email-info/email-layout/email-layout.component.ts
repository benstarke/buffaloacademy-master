import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { EmailInfoComponent } from '../email-info/email-info.component';
import { EmailMgmtComponent } from '../email-mgmt/email-mgmt.component';


@Component({
  selector: 'app-email-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    EmailInfoComponent,
    EmailMgmtComponent
  ],
  templateUrl: './email-layout.component.html',
  styleUrl: './email-layout.component.css'
})
export class EmailLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Emails Information', icon: 'dx-icon-info', command: () => 'email-information' },
      { label: 'Buffalo Emails Management', icon: 'dx-icon-settings', command: () => 'email-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/contact-page/dashboard-email/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/contact-page/dashboard-email']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
