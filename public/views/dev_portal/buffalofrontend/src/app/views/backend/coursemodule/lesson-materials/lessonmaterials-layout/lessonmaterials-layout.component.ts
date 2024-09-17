import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { LessonmaterialsInfoComponent } from '../lessonmaterials-info/lessonmaterials-info.component';
import { LessonmaterialsMgmtComponent } from '../lessonmaterials-mgmt/lessonmaterials-mgmt.component';

@Component({
  selector: 'app-lessonmaterials-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    LessonmaterialsInfoComponent,
    LessonmaterialsMgmtComponent
  ],
  templateUrl: './lessonmaterials-layout.component.html',
  styleUrl: './lessonmaterials-layout.component.css'
})
export class LessonmaterialsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'lessons Material Information', icon: 'dx-icon-info', command: () => 'lessons-material-information' },
      { label: 'lessons Material Management', icon: 'dx-icon-settings', command: () => 'lessons-material-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-lesson-materials/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-lesson-materials']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
