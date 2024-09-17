import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../status.model';
import { StatusService } from '../status.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-statusmgmt',
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
  templateUrl: './statusmgmt.component.html',
  styleUrl: './statusmgmt.component.css'
})
export class StatusmgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addStatusForm: FormGroup;
  updateStatusForm: FormGroup;
  deleteStatusForm: FormGroup;
  status: Status[] = [];
  noStatusMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedStatus: Status[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedStatusForDeletion: any[] = [];  
  selectedStatusCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleStatusGrid', { static: false }) multipleStatusGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) statusGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitStatusMenuItems = [
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
  permitGeneralStatusMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_status', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_status', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_status':
            this.onAddStatusClick();
            break;
        case 'delete_status':
            this.onDeleteMultipleStatusSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private statusService: StatusService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addStatusForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateStatusForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteStatusForm = new FormGroup({
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
    this.fetchStatus();
  }

  fetchStatus(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.statusService.getStatus().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.status = response.data;
          this.noStatusMessage = '';
          // this.showToast('Status loaded successfully!', 'success');
        } else {
          this.status = [];
          this.noStatusMessage = response.message;
          this.showToast(this.noStatusMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.status === 404 && error.error && error.error.message === 'No status found!') {
          this.status = [];
          this.noStatusMessage = error.error.message;
          this.showToast(this.noStatusMessage, 'info');
        } else {
          // console.error('Error fetching status:', error);
          this.noStatusMessage = 'Error fetching status';
          this.showToast(this.noStatusMessage, 'error');
        }
      }
    );
  }

  onAddStatusClick(): void {
    this.addPopupVisible = true;
  }

  onAddStatusSubmit(addAnother: boolean): void {
    if (this.addStatusForm.valid) {
        const newStatusName = this.addStatusForm.get('name')?.value.trim();

        // Frontend validation for unique status name
        const statusExists = this.status.some(status => status.name.toLowerCase() === newStatusName.toLowerCase());
        if (statusExists) {
            this.showToast('Status name already exists', 'error');
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
            ...this.addStatusForm.value,
        };

        this.statusService.addStatus(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchStatus(); // Refresh the status list
                    if (addAnother) {
                        this.addStatusForm.reset(); // Clear the form for the next entry
                        this.showToast('Status added successfully. You can add another.', 'success');
                    } else {
                        this.addStatusForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Status added successfully', 'success');
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
                    this.showToast('Status already exists', 'error');
                } else {
                    this.showToast('Error adding status', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addStatusForm.controls).forEach(key => {
            const control = this.addStatusForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                // Check if the control is invalid and has no value
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }
  

  onPopupHidden() {
    this.fetchStatus();
  }

  
  funcEditDetails(data:any) {
    this.updateStatusForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }


  onUpdateStatusSubmit(): void {
    if (this.updateStatusForm.valid) {
        const updatedStatusName = this.updateStatusForm.get('name')?.value.trim();
        const currentStatusId = this.updateStatusForm.get('id')?.value;

        // Frontend validation for unique status name (excluding the current status being edited)
        const statusExists = this.status.some(status => 
            status.name.toLowerCase() === updatedStatusName.toLowerCase() && 
            status.id !== currentStatusId
        );

        if (statusExists) {
            this.showToast('Status name already exists in another record', 'error');
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
        const updatedStatus = {
            ...this.updateStatusForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.statusService.updateStatus(updatedStatus, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchStatus(); // Refresh the status list
                this.updateStatusForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Status updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating status', 'error');
            }
        );
    } else {
        // Iterate through each control in the form group
        Object.keys(this.updateStatusForm.controls).forEach(key => {
            const control = this.updateStatusForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                // Check if the control is invalid and has no value
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }




  funcDeleteDetails(data:any) {
    this.deleteStatusForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteStatusSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const statusId = this.deleteStatusForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.statusService.deleteStatus(statusId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchStatus(); // Refresh the status list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Status deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting status', 'error');
        }
    );
  }



  // Triggered when the delete button is clicked
  onDeleteMultipleStatusSubmit(): void {
    const selectedStatuses = this.multipleStatusGrid.instance.getSelectedRowsData();
    if (selectedStatuses.length === 0) {
        this.showToast('No statuses selected.', 'error');
        return;
    }

    // Store the selected statuses for deletion and their count
    this.selectedStatusForDeletion = selectedStatuses;
    this.selectedStatusCount = selectedStatuses.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  // Confirm deletion
  confirmDeleteMultipleStatus(): void {
    this.isSubmitting = true;  // Start spinner

    const statusIds = this.selectedStatusForDeletion.map((status: any) => status.id);
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.statusService.deleteMultipleStatuses(statusIds, headers).subscribe(
        () => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchStatus();  // Refresh the status list after deletion
            this.deleteMultiplePopupVisible = false;  // Close the delete popup
            this.showToast(`${this.selectedStatusCount} Status(es) deleted successfully`, 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting statuses', 'error');
        }
    );
  }



  permitStatusActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedStatus = data.selectedRowsData;
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
