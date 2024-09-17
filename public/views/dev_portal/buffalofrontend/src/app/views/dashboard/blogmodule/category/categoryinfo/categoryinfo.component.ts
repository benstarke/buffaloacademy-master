import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';

import { ToastrService } from 'ngx-toastr';
import { Category } from '../category.model'; 
import { CategoryService } from '../category.service'; 

@Component({
  selector: 'app-categoryinfo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
  ],
  templateUrl: './categoryinfo.component.html',
  styleUrl: './categoryinfo.component.css'
})
export class CategoryinfoComponent implements OnInit {

  categories: Category[] = [];
  noCategoriesMessage = '';

  constructor(private categoryService: CategoryService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
          this.noCategoriesMessage = '';
          this.showToast('Categories loaded successfully!', 'success');
        } else {
          this.categories = [];
          this.noCategoriesMessage = response.message;
          this.showToast(this.noCategoriesMessage, 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
        this.noCategoriesMessage = 'Error fetching categories';
        this.showToast(this.noCategoriesMessage, 'error');
      }
    );
  }

  selectionChanged(data: any): void {
    // Handle selection change if needed
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    switch (type) {
      case 'success':
        this.toastr.success(message, 'Success', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      case 'error':
        this.toastr.error(message, 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        break;
      case 'info':
        this.toastr.info(message, 'Information', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      case 'warning':
        this.toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      default:
        console.warn(`Unsupported toast type: ${type}`);
        break;
    }
  }


}
