import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { NewsletterInfoComponent } from '../newsletter-info/newsletter-info.component';
import { NewsletterMgmtComponent } from '../newsletter-mgmt/newsletter-mgmt.component';


@Component({
  selector: 'app-newsletter-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    NewsletterInfoComponent,
    NewsletterMgmtComponent
  ],
  templateUrl: './newsletter-layout.component.html',
  styleUrl: './newsletter-layout.component.css'
})
export class NewsletterLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'System Newsletter Information', icon: 'dx-icon-info', command: () => 'newsletter-information' },
      { label: 'System Newsletter Management', icon: 'dx-icon-settings', command: () => 'newsletter-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-newsletter/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-newsletter']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

