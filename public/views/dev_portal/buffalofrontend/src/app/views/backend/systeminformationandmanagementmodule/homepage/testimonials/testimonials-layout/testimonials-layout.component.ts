import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxTabPanelModule } from 'devextreme-angular';
import { TestimonialsInfoComponent } from '../testimonials-info/testimonials-info.component';
import { TestimonialsMgmtComponent } from '../testimonials-mgmt/testimonials-mgmt.component';


@Component({
  selector: 'app-testimonials-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTabPanelModule,
    TestimonialsInfoComponent,
    TestimonialsMgmtComponent
  ],
  templateUrl: './testimonials-layout.component.html',
  styleUrl: './testimonials-layout.component.css'
})
export class TestimonialsLayoutComponent implements OnInit {
  items: any[] = [];
  selectedIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Buffalo Students Testimonials Information', icon: 'dx-icon-info', command: () => 'testimonials-information' },
      { label: 'Buffalo Students Testimonials Management', icon: 'dx-icon-settings', command: () => 'testimonials-management' }
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
      this.router.navigate([`/admin-buffalo/system-information-management/home-page/dashboard-testimonials/${path}`]);
    } else {
      this.router.navigate(['/admin-buffalo/system-information-management/home-page/dashboard-testimonials']);
    }
  }

  isActive(item: any): boolean {
    return this.items[this.selectedIndex] === item;
  }
}

