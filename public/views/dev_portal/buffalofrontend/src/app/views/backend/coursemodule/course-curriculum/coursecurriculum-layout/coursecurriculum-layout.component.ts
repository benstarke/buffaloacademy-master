import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { CoursecurriculumInfoComponent } from '../coursecurriculum-info/coursecurriculum-info.component'; 
import { CoursecurriculumMgmtComponent } from '../coursecurriculum-mgmt/coursecurriculum-mgmt.component'; 

@Component({
  selector: 'app-coursecurriculum-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    CoursecurriculumInfoComponent,
    CoursecurriculumMgmtComponent
  ],
  templateUrl: './coursecurriculum-layout.component.html',
  styleUrl: './coursecurriculum-layout.component.css'
})
export class CoursecurriculumLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Curriculum Information', icon: 'dx-icon-info', command: () => 'course-curriculum-information' },
      { label: 'Curriculum Management', icon: 'dx-icon-settings', command: () => 'course-curriculum-management' }
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
      this.router.navigate([`/admin-buffalo/course-management/dashboard-course-curriculums/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/course-management/dashboard-course-curriculums']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}
