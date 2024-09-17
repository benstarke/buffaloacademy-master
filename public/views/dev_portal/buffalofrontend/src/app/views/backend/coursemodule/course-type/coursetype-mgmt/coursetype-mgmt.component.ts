import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Type } from '../type.model';
import { TypeService } from '../type.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-coursetype-mgmt',
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
  templateUrl: './coursetype-mgmt.component.html',
  styleUrl: './coursetype-mgmt.component.css'
})
export class CoursetypeMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addTypeForm: FormGroup;
  updateTypeForm: FormGroup;
  deleteTypeForm: FormGroup;
  types: Type[] = [];
  noTypesMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedTypes: Type[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedTypeForDeletion: any[] = [];  
  selectedTypeCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleTypeGrid', { static: false }) multipleTypeGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) typesGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitTypeMenuItems = [
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
  permitGeneralTypeMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_type', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_type', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_type':
            this.onAddTypeClick();
            break;
        case 'delete_type':
            this.onDeleteMultipleTypeSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private typeService: TypeService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addTypeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateTypeForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteTypeForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      name: 'Name',
      description: 'Description',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchTypes();
  }

  fetchTypes(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.typeService.getTypes().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.types = response.data;
          this.noTypesMessage = '';
        } else {
          this.types = [];
          this.noTypesMessage = response.message;
          this.showToast(this.noTypesMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Type === 404 && error.error && error.error.message === 'No types found!') {
          this.types = [];
          this.noTypesMessage = error.error.message;
          this.showToast(this.noTypesMessage, 'info');
        } else {
          this.noTypesMessage = 'Error fetching types';
          this.showToast(this.noTypesMessage, 'error');
        }
      }
    );
  }

  onAddTypeClick(): void {
    this.addPopupVisible = true;
  }

  onAddTypeSubmit(addAnother: boolean): void {
    if (this.addTypeForm.valid) {
        const newTypeName = this.addTypeForm.get('name')?.value.trim();

        // Frontend validation for unique type name
        const typeExists = this.types.some(type => type.name.toLowerCase() === newTypeName.toLowerCase());
        if (typeExists) {
            this.showToast('Type name already exists', 'error');
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
            ...this.addTypeForm.value,
        };

        this.typeService.addType(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchTypes(); // Refresh the type list
                    if (addAnother) {
                        this.addTypeForm.reset(); // Clear the form for the next entry
                        this.showToast('Type added successfully. You can add another.', 'success');
                    } else {
                        this.addTypeForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Type added successfully', 'success');
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

                if (error.status === 422 && error.error.errors) {
                    this.showToast('Type already exists', 'error');
                } else {
                    this.showToast('Error adding type', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addTypeForm.controls).forEach(key => {
            const control = this.addTypeForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  onPopupHidden() {
    this.fetchTypes();
  }

  funcEditDetails(data: any) {
    this.updateTypeForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateTypeSubmit(): void {
    if (this.updateTypeForm.valid) {
        const updatedTypeName = this.updateTypeForm.get('name')?.value.trim();
        const currentTypeId = this.updateTypeForm.get('id')?.value;

        // Frontend validation for unique Type name (excluding the current Type being edited)
        const typeExists = this.types.some(type => 
            type.name.toLowerCase() === updatedTypeName.toLowerCase() && 
            type.id !== currentTypeId
        );

        if (typeExists) {
            this.showToast('Course type name already exists in another record', 'error');
            return;
        }

        this.isSubmitting = true;  // Start spinner

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmitting = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const updatedType = {
            ...this.updateTypeForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.typeService.updateType(updatedType, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchTypes(); // Refresh the tag list
                this.updateTypeForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Course type updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course type', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateTypeForm.controls).forEach(key => {
            const control = this.updateTypeForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  funcDeleteDetails(data:any) {
    this.deleteTypeForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteTypeSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteTypeForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.typeService.deleteType(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchTypes(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Type deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course type', 'error');
        }
    );
  }


  onDeleteMultipleTypeSubmit(): void {
    const selectedTypes = this.multipleTypeGrid.instance.getSelectedRowsData();
    if (selectedTypes.length === 0) {
        this.showToast('No course types selected.', 'error');
        return;
    }

    // Store the selected types for deletion and their count
    this.selectedTypeForDeletion = selectedTypes;
    this.selectedTypeCount = selectedTypes.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleType(): void {
      this.isSubmitting = true;  // Start spinner

      const typeIds = this.selectedTypeForDeletion.map((type: any) => type.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.typeService.deleteMultipleTypes(typeIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchTypes();  // Refresh the type list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedTypeCount} Type(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting types', 'error');
          }
      );
  }
 

  permitTypeActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedTypes = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
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
