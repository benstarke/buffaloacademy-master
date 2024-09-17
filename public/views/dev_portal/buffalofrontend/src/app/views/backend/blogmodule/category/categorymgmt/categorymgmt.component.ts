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
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';



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
  // categories: Category[] = [];
  categories: any[] = [];
  noCategoriesMessage = '';
  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button


  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  // Holds the selected categories for deletion
  selectedCategoriesForDeletion: any[] = [];  // Adjust the type according to your data structure
  selectedCategoriesCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleCategoriesGrid', { static: false }) multipleCategoriesGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) categoriesGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

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

  // Define the menu items for the action menu
  permitGeneralCategoryMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_category', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_category', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
];


onMenuItemClick(event: any): void {
  const action = event.itemData.action;

  switch (action) {
      case 'add_category':
          this.onAddCategoryClick();
          break;
      case 'delete_category':
          this.onDeleteMultipleCategorySubmit();
          break;
      default:
          break;
  }
}



  constructor(
    private categoryService: CategoryService, 
    public toastr: ToastrService,
    private http: HttpClient,) {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
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

    // Mapping for user-friendly field names
    this.fieldNames = {
      // id: 'Id',
      name: 'Name',
      description: 'Description',
      };
    }

    // Field name mapping object
  private fieldNames: { [key: string]: string };


  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
     // Set the spinner to be visible when the method starts
     this.isLoading = true;

    this.categoryService.getCategories().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.categories = response.data;
          this.noCategoriesMessage = '';
          // this.showToast('Categories loaded successfully!', 'success');
        } else {
          this.categories = [];
          this.noCategoriesMessage = response.message;
          this.showToast(this.noCategoriesMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner if there's an error
        this.isLoading = false;

        // console.error('Error fetching categories:', error);
        this.noCategoriesMessage = 'Error fetching categories';
        this.showToast(this.noCategoriesMessage, 'error');
      }
    );
  }

  onAddCategoryClick(): void {
    this.addPopupVisible = true;
  }


  onAddCategorySubmit(addAnother: boolean): void {
    if (this.addCategoryForm.valid) {
        const newCategoryName = this.addCategoryForm.get('name')?.value.trim();

        // Frontend validation for unique category name
        const categoryExists = this.categories.some(category => category.name.toLowerCase() === newCategoryName.toLowerCase());
        if (categoryExists) {
            this.showToast('Category name already exists', 'error');
            return;
        }

        if (addAnother) {
            this.isSubmittingSaveAndAddAnother = true;  // Start spinner for "Save and Add Another"
        } else {
            this.isSubmittingSave = true;  // Start spinner for "Save"
        }

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('No token found. Please log in again.', 'error');
            this.isSubmittingSave = false;  // Stop spinner
            this.isSubmittingSaveAndAddAnother = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formValueWithCreatedBy = {
            ...this.addCategoryForm.value,
        };

        this.categoryService.addCategory(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchCategories(); // Refresh the category list
                    if (addAnother) {
                        this.addCategoryForm.reset(); // Clear the form for the next entry
                        this.showToast('Category added successfully. You can add another.', 'success');
                    } else {
                        this.addCategoryForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Category added successfully', 'success');
                    }
                } else {
                    this.showToast(response.message, 'error');
                }
            },
            (error: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                this.showToast('Error submitting category', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addCategoryForm.controls).forEach(key => {
            const control = this.addCategoryForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                // Check if the control is invalid and has no value
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
}



  onPopupHidden() {
    this.fetchCategories();
  }

  onUpdateCategorySubmit(): void {
    if (this.updateCategoryForm.valid) {
        const updatedCategoryName = this.updateCategoryForm.get('name')?.value.trim();
        const currentCategoryId = this.updateCategoryForm.get('id')?.value;

        // Frontend validation for unique category name (excluding the current category being edited)
        const categoryExists = this.categories.some(category => 
            category.name.toLowerCase() === updatedCategoryName.toLowerCase() && 
            category.id !== currentCategoryId
        );

        if (categoryExists) {
            this.showToast('Category name already exists in another record', 'error');
            return;
        }

        this.isSubmitting = true;  // Start spinner

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('No token found. Please log in again.', 'error');
            this.isSubmitting = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const updatedCategory: Category = {
            ...this.updateCategoryForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.categoryService.updateCategory(updatedCategory, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchCategories(); // Refresh the category list
                this.updateCategoryForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Category updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating category', 'error');
            }
        );
    } else {
      // Iterate through each control in the form group
      Object.keys(this.updateCategoryForm.controls).forEach(key => {
        const control = this.updateCategoryForm.get(key);
        if (control && control.invalid && (control.value === null || control.value === '')) {
          // Check if the control is invalid and has no value
          const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
          this.showToast(`${fieldName} field is required`, 'error');
        }
      });
    }
}


  // delete one record at a time
  onDeleteCategorySubmit(): void {
    this.isSubmitting = true;  // Stop spinner
    const categoryId = this.deleteCategoryForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.categoryService.deleteCategory(categoryId, headers).subscribe(
        (response) => {
          this.isSubmitting = false;  // Stop spinner
            // console.log('Category deleted successfully:', response);
            this.fetchCategories(); // Refresh the category list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Category deleted successfully', 'warning');
        },
        (error) => {
          this.isSubmitting = false;  // Stop spinner
            // console.error('Error deleting category:', error);
            this.showToast('Error deleting category', 'error');
        }
    );
  }


  // Triggered when the delete button is clicked
  onDeleteMultipleCategorySubmit(): void {
    const selectedCategories = this.multipleCategoriesGrid.instance.getSelectedRowsData();
    if (selectedCategories.length === 0) {
        this.showToast('No categories selected.', 'error');
        return;
    }

    // Store the selected categories for deletion and their count
    this.selectedCategoriesForDeletion = selectedCategories;
    this.selectedCategoriesCount = selectedCategories.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  // Confirm deletion
  confirmDeleteMultipleCategories(): void {
    this.isSubmitting = true;  // Start spinner

    const categoryIds = this.selectedCategoriesForDeletion.map((category: any) => category.id);
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.categoryService.deleteMultipleCategories(categoryIds, headers).subscribe(
        () => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchCategories();  // Refresh the category list after deletion
            this.deleteMultiplePopupVisible = false;  // Close the delete popup
            this.showToast(`${this.selectedCategoriesCount} Blog Category(ies) deleted successfully`, 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting categories', 'error');
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
        this.toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        break;
      default:
        console.warn(`Unsupported toast type: ${type}`);
        break;
    }
  }
}
