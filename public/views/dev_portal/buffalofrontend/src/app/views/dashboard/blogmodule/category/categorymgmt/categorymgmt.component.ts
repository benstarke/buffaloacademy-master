import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../category.model'; 
import { CategoryService } from '../category.service'; 
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';




@Component({  
  selector: 'app-tagmgmt',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxTextBoxModule, DxTextAreaModule,
    DxMenuModule
  ],
  templateUrl: './categorymgmt.component.html',
  styleUrls: ['./categorymgmt.component.css']
})

export class CategorymgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addCategoryForm: FormGroup;
  updateCategoryForm: FormGroup;
  deleteCategoryForm: FormGroup;
  categories: Category[] = [];
  noCategoriesMessage = '';

  permitCategoryMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  @ViewChild(DxDataGridComponent, { static: false }) categoriesGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  constructor(private categoryService: CategoryService, public toastr: ToastrService) {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateCategoryForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteCategoryForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

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

  onAddCategoryClick(): void {
    this.addPopupVisible = true;
  }

  onAddCategorySubmit(): void {
    if (this.addCategoryForm.valid) {
      const formValueWithCreatedBy = {
        ...this.addCategoryForm.value,
        created_by: localStorage.getItem('first_name') || 'Unknown'
      };
  
      this.categoryService.addCategory(formValueWithCreatedBy).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Category added successfully:', response);
            this.fetchCategories(); // Refresh the category list
            this.addCategoryForm.reset(); // Clear the form after adding
            this.addPopupVisible = false; // Close the add popup
            this.showToast('Category added successfully', 'success');
          } else {
            console.error('Error adding category:', response.message);
            this.showToast(response.message, 'error');
          }
        },
        (error: any) => {
          console.error('Error adding category:', error);
          if (error.status === 422 && error.error.errors) {
            this.showToast('Category already exists', 'error');
          } else {
            this.showToast('Error adding category', 'error');
          }
        }
      );
    } else {
      // Form is invalid, display a toast message for each invalid field
      Object.keys(this.addCategoryForm.controls).forEach(key => {
        if (this.addCategoryForm.controls[key].invalid) {
          this.showToast(`${key} is required or invalid`, 'error');
        }
      });
    }
  }
  

  onPopupHidden() {
    this.fetchCategories();
  }


  onUpdateCategorySubmit(): void {
    if (this.updateCategoryForm.valid) {
      const updatedCategory: Category = this.updateCategoryForm.value;
      this.categoryService.updateCategory(updatedCategory).subscribe(
        (response) => {
          console.log('Category updated successfully:', response);
          this.fetchCategories(); // Refresh the category list
          this.updateCategoryForm.reset(); // Clear the form after update
          this.updatePopupVisible = false; // Close the update popup
          this.showToast('Category updated successfully', 'success');
        },
        (error) => {
          console.error('Error updating category:', error);
          this.showToast('Error updating category', 'error');
        }
      );
    }
  }

  onDeleteCategorySubmit(): void {
    const categoryId = this.deleteCategoryForm.value.id;

    this.categoryService.deleteCategory(categoryId).subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        this.fetchCategories(); // Refresh the category list after deletion
        this.deletePopupVisible = false; // Close the delete popup
        this.showToast('Category deleted successfully', 'success');
      },
      (error) => {
        console.error('Error deleting category:', error);
        this.showToast('Error deleting category', 'error');
      }
    );
  }

  permitCategoryActionColClick(event: any, data: any): void {
    const action = event.itemData.action;
    if (action === 'edit_record') {
      this.funcEditDetails(data);
    } else if (action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  funcEditDetails(data: any): void {
    this.updateCategoryForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  funcDeleteDetails(data: any): void {
    this.deleteCategoryForm.patchValue(data.data);
    this.deletePopupVisible = true;
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
