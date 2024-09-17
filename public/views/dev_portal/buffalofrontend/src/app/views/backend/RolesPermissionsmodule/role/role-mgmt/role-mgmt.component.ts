import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Roles } from '../roles.model';
import { RolesService } from '../roles.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-role-mgmt',
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
  templateUrl: './role-mgmt.component.html',
  styleUrl: './role-mgmt.component.css'
})
export class RoleMgmtComponent  implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addRolesForm: FormGroup;
  updateRolesForm: FormGroup;
  deleteRolesForm: FormGroup;
  roles: Roles[] = [];
  noRolesMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedRoles: Roles[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedRolesForDeletion: any[] = [];  
  selectedRolesCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleRolesGrid', { static: false }) multipleRolesGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) rolesGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitRolesMenuItems = [
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
  permitGeneralRolesMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_roles', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_roles', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_roles':
            this.onAddRolesClick();
            break;
        case 'delete_roles':
            this.onDeleteMultipleRolesSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private rolesService: RolesService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addRolesForm = new FormGroup({
      name: new FormControl('', Validators.required),
      // description: new FormControl('', Validators.required)
    });

    this.updateRolesForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      // description: new FormControl('', Validators.required)
    });

    this.deleteRolesForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      // description: new FormControl('', Validators.required)
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
    this.fetchRoles();
  }

  fetchRoles(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.rolesService.getRoles().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.roles = response.data;
          this.noRolesMessage = '';
          // this.showToast('Roles loaded successfully!', 'success');
        } else {
          this.roles = [];
          this.noRolesMessage = response.message;
          this.showToast(this.noRolesMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.roles === 404 && error.error && error.error.message === 'No roles found!') {
          this.roles = [];
          this.noRolesMessage = error.error.message;
          this.showToast(this.noRolesMessage, 'info');
        } else {
          // console.error('Error fetching Roles:', error);
          this.noRolesMessage = 'Error fetching Roles';
          this.showToast(this.noRolesMessage, 'error');
        }
      }
    );
  }

  onAddRolesClick(): void {
    this.addPopupVisible = true;
  }

  onAddRolesSubmit(addAnother: boolean): void {
    if (this.addRolesForm.valid) {
        const newRolesName = this.addRolesForm.get('name')?.value.trim();

        // Frontend validation for unique roles name
        const rolesExists = this.roles.some(roles => roles.name.toLowerCase() === newRolesName.toLowerCase());
        if (rolesExists) {
            this.showToast('Roles name already exists', 'error');
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
            ...this.addRolesForm.value,
        };

        this.rolesService.addRoles(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchRoles(); // Refresh the Roles list
                    if (addAnother) {
                        this.addRolesForm.reset(); // Clear the form for the next entry
                        this.showToast('Roles added successfully. You can add another.', 'success');
                    } else {
                        this.addRolesForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Roles added successfully', 'success');
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

                if (error.roles === 422 && error.error.errors) {
                    this.showToast('Roles already exists', 'error');
                } else {
                    this.showToast('Error adding Roles', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addRolesForm.controls).forEach(key => {
            const control = this.addRolesForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                // Check if the control is invalid and has no value
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }
  

  onPopupHidden() {
    this.fetchRoles();
  }

  
  funcEditDetails(data:any) {
    this.updateRolesForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }


  onUpdateRolesSubmit(): void {
    if (this.updateRolesForm.valid) {
        const updatedRolesName = this.updateRolesForm.get('name')?.value.trim();
        const currentRolesId = this.updateRolesForm.get('id')?.value;

        // Frontend validation for unique Roles name (excluding the current Roles being edited)
        const rolesExists = this.roles.some(roles => 
            roles.name.toLowerCase() === updatedRolesName.toLowerCase() && 
            roles.id !== currentRolesId
        );

        if (rolesExists) {
            this.showToast('Roles name already exists in another record', 'error');
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
        const updatedRoles = {
            ...this.updateRolesForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.rolesService.updateRoles(updatedRoles, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchRoles(); // Refresh the Roles list
                this.updateRolesForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Roles updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating Roles', 'error');
            }
        );
    } else {
        // Iterate through each control in the form group
        Object.keys(this.updateRolesForm.controls).forEach(key => {
            const control = this.updateRolesForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                // Check if the control is invalid and has no value
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }




  funcDeleteDetails(data:any) {
    this.deleteRolesForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteRolesSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const rolesId = this.deleteRolesForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.rolesService.deleteRoles(rolesId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchRoles(); // Refresh the status list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Roles deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting roles', 'error');
        }
    );
  }



  // Triggered when the delete button is clicked
  onDeleteMultipleRolesSubmit(): void {
    const selectedRoles = this.multipleRolesGrid.instance.getSelectedRowsData();
    if (selectedRoles.length === 0) {
        this.showToast('No roles selected.', 'error');
        return;
    }

    // Store the selected Roles for deletion and their count
    this.selectedRolesForDeletion = selectedRoles;
    this.selectedRolesCount = selectedRoles.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  // Confirm deletion
  confirmDeleteMultipleRoles(): void {
    this.isSubmitting = true;  // Start spinner

    const rolesIds = this.selectedRolesForDeletion.map((roles: any) => roles.id);
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.rolesService.deleteMultipleRoles(rolesIds, headers).subscribe(
        () => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchRoles();  // Refresh the Roles list after deletion
            this.deleteMultiplePopupVisible = false;  // Close the delete popup
            this.showToast(`${this.selectedRolesCount} Role(s) deleted successfully`, 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting Roles', 'error');
        }
    );
  }



  permitRolesActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedRoles = data.selectedRowsData;
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

