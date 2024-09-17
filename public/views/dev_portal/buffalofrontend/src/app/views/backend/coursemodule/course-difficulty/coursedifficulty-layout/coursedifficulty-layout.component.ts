import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursedifficultyInfoComponent } from '../coursedifficulty-info/coursedifficulty-info.component'; 
import { CoursedifficultyMgmtComponent } from '../coursedifficulty-mgmt/coursedifficulty-mgmt.component'; 

@Component({
  selector: 'app-coursedifficulty-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursedifficultyInfoComponent,
    CoursedifficultyMgmtComponent
  ],
  templateUrl: './coursedifficulty-layout.component.html',
  styleUrl: './coursedifficulty-layout.component.css'
})
export class CoursedifficultyLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Course Levels Information', icon: 'dx-icon-info', command: () => 'course-difficulty-information' },
      { label: 'Course Levels Management', icon: 'dx-icon-settings', command: () => 'course-difficulty-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-difficulty/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-difficulty']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
