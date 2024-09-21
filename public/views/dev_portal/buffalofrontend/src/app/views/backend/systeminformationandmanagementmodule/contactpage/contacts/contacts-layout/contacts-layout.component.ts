import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { ContactsInfoComponent } from '../contacts-info/contacts-info.component';
import { ContactsMgmtComponent } from '../contacts-mgmt/contacts-mgmt.component';


@Component({
  selector: 'app-contacts-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    ContactsInfoComponent,
    ContactsMgmtComponent
  ],
  templateUrl: './contacts-layout.component.html',
  styleUrl: './contacts-layout.component.css'
})
export class ContactsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Contacts Information', icon: 'dx-icon-info', command: () => 'contacts-information' },
      { label: 'Buffalo Contacts Management', icon: 'dx-icon-settings', command: () => 'contacts-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/contact-page/dashboard-contacts/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/contact-page/dashboard-contacts']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

