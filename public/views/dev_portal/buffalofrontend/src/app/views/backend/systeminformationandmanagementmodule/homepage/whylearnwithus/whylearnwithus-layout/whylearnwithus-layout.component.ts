import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { WhylearnwithusInfoComponent } from '../whylearnwithus-info/whylearnwithus-info.component';
import { WhylearnwithusMgmtComponent } from '../whylearnwithus-mgmt/whylearnwithus-mgmt.component';


@Component({
  selector: 'app-whylearnwithus-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    WhylearnwithusInfoComponent,
    WhylearnwithusMgmtComponent
  ],
  templateUrl: './whylearnwithus-layout.component.html',
  styleUrl: './whylearnwithus-layout.component.css'
})
export class WhylearnwithusLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Why Learn With Us Information', icon: 'dx-icon-info', command: () => 'why-learn-with-us-information' },
      { label: 'Why Learn With Us Management', icon: 'dx-icon-settings', command: () => 'why-learn-with-us-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-why-learn-with-us/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-why-learn-with-us']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

