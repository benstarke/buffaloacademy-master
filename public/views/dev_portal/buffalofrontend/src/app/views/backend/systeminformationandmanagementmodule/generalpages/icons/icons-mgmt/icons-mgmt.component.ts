import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Icons } from '../icons.model'; 
import { IconService } from '../icons.service';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-icons-mgmt',
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
    DxMenuModule,
    DxSelectBoxModule,
  ],
  templateUrl: './icons-mgmt.component.html',
  styleUrl: './icons-mgmt.component.css'
})
export class IconsMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addIconsForm: FormGroup;
  updateIconsForm: FormGroup;
  deleteIconsForm: FormGroup;
  Icons: Icons[] = [];
  noIconsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedIcons: Icons[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedIconsForDeletion: any[] = [];  
  selectedIconsCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleIconsGrid', { static: false }) multipleIconsGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) IconssGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitIconsMenuItems = [
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
  permitGeneralIconsMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Icons', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Icons', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Icons':
            this.onAddIconsClick();
            break;
        case 'delete_Icons':
            this.onDeleteMultipleIconsSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private IconsService: IconService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addIconsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required)
    });

    this.updateIconsForm = new FormGroup({
      id: new FormControl('', Validators.required),
       name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required)
    });

    this.deleteIconsForm = new FormGroup({
      id: new FormControl('', Validators.required),
       name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required)
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      name: 'Name',
      description: 'Description',
      icon: "Icon symbol"
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchIcons();
  }

  fetchIcons(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.IconsService.getIcons().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Icons = response.data;
          this.noIconsMessage = '';
        } else {
          this.Icons = [];
          this.noIconsMessage = response.message;
          this.showToast(this.noIconsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Type === 404 && error.error && error.error.message === 'No course Icons found!') {
          this.Icons = [];
          this.noIconsMessage = error.error.message;
          this.showToast(this.noIconsMessage, 'info');
        } else {
          this.noIconsMessage = 'Error fetching course Icons';
          this.showToast(this.noIconsMessage, 'error');
        }
      }
    );
  }

  onAddIconsClick(): void {
    this.addPopupVisible = true;
  }

  onAddIconsSubmit(addAnother: boolean): void {
    if (this.addIconsForm.valid) {
        const newIconsName = this.addIconsForm.get('name')?.value.trim();

        // Frontend validation for unique Icons name
        const IconsExists = this.Icons.some(Icons => Icons.name.toLowerCase() === newIconsName.toLowerCase());
        if (IconsExists) {
            this.showToast('Course Icons name already exists', 'error');
            return;
        }

        if (addAnother) {
            this.isSubmittingSaveAndAddAnother = true;  // Start spinner for "Save and Add Another"
        } else {
            this.isSubmittingSave = true;  // Start spinner for "Save"
        }

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmittingSave = false;  // Stop spinner
            this.isSubmittingSaveAndAddAnother = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formValueWithCreatedBy = {
            ...this.addIconsForm.value,
        };

        this.IconsService.addIcon(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchIcons(); // Refresh the Icons list
                    if (addAnother) {
                        this.addIconsForm.reset(); // Clear the form for the next entry
                        this.showToast('Course Icons added successfully. You can add another.', 'success');
                    } else {
                        this.addIconsForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Course Icons added successfully', 'success');
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
                    this.showToast('Course Icons already exists', 'error');
                } else {
                    this.showToast('Error adding course Icons', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addIconsForm.controls).forEach(key => {
            const control = this.addIconsForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  onPopupHidden() {
    this.fetchIcons();
  }

  funcEditDetails(data: any) {
    this.updateIconsForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateIconsSubmit(): void {
    if (this.updateIconsForm.valid) {
        const updatedIconsName = this.updateIconsForm.get('name')?.value.trim();
        const currentIconsId = this.updateIconsForm.get('id')?.value;

        // Frontend validation for unique Icons name (excluding the current Icons being edited)
        const IconsExists = this.Icons.some(Icons => 
            Icons.name.toLowerCase() === updatedIconsName.toLowerCase() && 
            Icons.id !== currentIconsId
        );

        if (IconsExists) {
            this.showToast('Course Icons name already exists in another record', 'error');
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
            ...this.updateIconsForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.IconsService.updateIcons(updatedType, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchIcons(); // Refresh the tag list
                this.updateIconsForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Course Icons updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course Icons', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateIconsForm.controls).forEach(key => {
            const control = this.updateIconsForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  funcDeleteDetails(data:any) {
    this.deleteIconsForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteIconsSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteIconsForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.IconsService.deleteIcon(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchIcons(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Course Icons deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Icons', 'error');
        }
    );
  }


  onDeleteMultipleIconsSubmit(): void {
    const selectedIcons = this.multipleIconsGrid.instance.getSelectedRowsData();
    if (selectedIcons.length === 0) {
        this.showToast('No course Icons selected.', 'error');
        return;
    }

    // Store the selected Icons for deletion and their count
    this.selectedIconsForDeletion = selectedIcons;
    this.selectedIconsCount = selectedIcons.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleIcons(): void {
      this.isSubmitting = true;  // Start spinner

      const IconsIds = this.selectedIconsForDeletion.map((Icons: any) => Icons.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.IconsService.deleteMultipleIcons(IconsIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchIcons();  // Refresh the type list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedIconsCount} Course Icons deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting course Icons', 'error');
          }
      );
  }
 

  permitIconsActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedIcons = data.selectedRowsData;
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
