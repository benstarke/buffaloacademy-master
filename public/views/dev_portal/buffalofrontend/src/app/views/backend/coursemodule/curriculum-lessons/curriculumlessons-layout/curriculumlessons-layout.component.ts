import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CurriculumlessonsInfoComponent } from '../curriculumlessons-info/curriculumlessons-info.component';
import { CurriculumlessonsMgmtComponent } from '../curriculumlessons-mgmt/curriculumlessons-mgmt.component';

@Component({
  selector: 'app-curriculumlessons-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CurriculumlessonsInfoComponent,
    CurriculumlessonsMgmtComponent
  ],
  templateUrl: './curriculumlessons-layout.component.html',
  styleUrl: './curriculumlessons-layout.component.css'
})
export class CurriculumlessonsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Curriculum lesson Information', icon: 'dx-icon-info', command: () => 'curriculum-lesson-information' },
      { label: 'Curriculum lesson Management', icon: 'dx-icon-settings', command: () => 'curriculum-lesson-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-curriculum-lessons/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-curriculum-lessons']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
