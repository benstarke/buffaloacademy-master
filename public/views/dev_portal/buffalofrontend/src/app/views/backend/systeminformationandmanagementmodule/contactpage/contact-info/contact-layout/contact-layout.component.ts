import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ContactMgmtComponent } from '../contact-mgmt/contact-mgmt.component';


@Component({
  selector: 'app-contact-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    ContactInfoComponent,
    ContactMgmtComponent
  ],
  templateUrl: './contact-layout.component.html',
  styleUrl: './contact-layout.component.css'
})
export class ContactLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'System Contact Information', icon: 'dx-icon-info', command: () => 'contact-information' },
      { label: 'System Contact Management', icon: 'dx-icon-settings', command: () => 'contact-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/contact-page/dashboard-contact/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/contact-page/dashboard-contact']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
