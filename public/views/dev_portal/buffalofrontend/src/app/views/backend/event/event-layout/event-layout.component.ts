import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { EventInfoComponent } from '../event-info/event-info.component';
import { EventMgmtComponent } from '../event-mgmt/event-mgmt.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    EventInfoComponent,
    EventMgmtComponent
  ],
  templateUrl: './event-layout.component.html',
  styleUrls: ['./event-layout.component.css']
})

export class EventLayoutComponent implements OnInit {

  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Event Information', icon: 'dx-icon-info', command: () => 'event-information' },
      { label: 'Event Management', icon: 'dx-icon-settings', command: () => 'event-management' }
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
      this.router.navigate([`/admin-buffalo/student-instructor-courses/event-dashboard/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/student-instructor-courses/event-dashboard']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

