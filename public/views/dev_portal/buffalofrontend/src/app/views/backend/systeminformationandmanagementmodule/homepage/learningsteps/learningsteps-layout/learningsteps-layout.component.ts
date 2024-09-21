import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { LearningstepsInfoComponent } from '../learningsteps-info/learningsteps-info.component';
import { LearningstepsMgmtComponent } from '../learningsteps-mgmt/learningsteps-mgmt.component';


@Component({
  selector: 'app-learningsteps-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    LearningstepsInfoComponent,
    LearningstepsMgmtComponent
  ],
  templateUrl: './learningsteps-layout.component.html',
  styleUrl: './learningsteps-layout.component.css'
})
export class LearningstepsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Learning Steps Information', icon: 'dx-icon-info', command: () => 'learning-steps-information' },
      { label: 'Buffalo Learning Steps Management', icon: 'dx-icon-settings', command: () => 'learning-steps-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-learning-steps/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-learning-steps']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

