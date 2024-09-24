import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Partners } from '../partners.model'; 
import { PartnerService } from '../partners.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-partners-mgmt',
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
  templateUrl: './partners-mgmt.component.html',
  styleUrl: './partners-mgmt.component.css'
})
export class PartnersMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addPartnerForm: FormGroup;
  updatePartnerForm: FormGroup;
  deletePartnerForm: FormGroup;
  Partners: Partners[] = [];
  noPartnersMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedPartners: Partners[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button


  // file uploads
  // Other properties
  fileError: string | null = null; // Declare fileError with initial value null
  uploadProgress: number = -1; // Initialize upload progress to -1 to hide progress bar initially


  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedPartnerForDeletion: any[] = [];  
  selectedPartnerCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multiplePartnerGrid', { static: false }) multiplePartnerGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) PartnersGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;  // Use '!' to tell TypeScript that this will be initialized later


  permitPartnerMenuItems = [
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
  permitGeneralPartnerMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Partner', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Partner', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Partner':
            this.onAddPartnerClick();
            break;
        case 'delete_Partner':
            this.onDeleteMultiplePartnerSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private PartnerService: PartnerService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addPartnerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      partner_logo_path: new FormControl('')
    });

    this.updatePartnerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      partner_logo_path: new FormControl('')
    });

    this.deletePartnerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      partner_logo_path: new FormControl('')
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      name: 'Partner Name',
      partner_image_path: 'Partner Image',
      description: 'Description',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchPartners();
  }


  fetchPartners(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.PartnerService.getPartners().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Partners = response.data;
          this.noPartnersMessage = '';
        } else {
          this.Partners = [];
          this.noPartnersMessage = response.message;
          this.showToast(this.noPartnersMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Partner === 404 && error.error && error.error.message === 'No Partners found!') {
          this.Partners = [];
          this.noPartnersMessage = error.error.message;
          this.showToast(this.noPartnersMessage, 'info');
        } else {
          this.noPartnersMessage = 'Error fetching Partners';
          this.showToast(this.noPartnersMessage, 'error');
        }
      }
    );
  }

  onAddPartnerClick(): void {
    this.addPopupVisible = true;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase(); // Extract file extension

        // Allowed MIME types and file extensions for image files
        const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        // Check if file is an image and has a valid extension
        if (!allowedImageMimeTypes.includes(file.type) || !allowedImageExtensions.includes(fileExtension)) {
            this.fileError = `Please upload a valid image file (jpg, jpeg, png, gif).`;
            this.addPartnerForm.get('partner_image_path')?.setErrors({ invalidFileType: true });
            this.showToast(this.fileError, 'error'); // Show error toast for invalid file type
        } else if (file.size > 5000000) { // 5 MB max size
            this.fileError = 'File size exceeds the maximum allowed limit of 5 MB.';
            this.addPartnerForm.get('partner_image_path')?.setErrors({ fileSizeExceeded: true });
            this.showToast(this.fileError, 'error'); // Show error toast for exceeding file size
        } else {
            this.fileError = null; // Clear previous errors
            this.addPartnerForm.patchValue({ partner_image_path: file }); // Set the selected file to the form

            // Read file for progress tracking
            const reader = new FileReader();
            reader.onprogress = (event: ProgressEvent) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    this.uploadProgress = percentComplete; // Update progress
                }
            };

            reader.onload = () => {
                this.uploadProgress = 100; // File read complete
            };

            reader.onerror = () => {
                this.uploadProgress = -1; // Error reading file
                this.fileError = 'Error reading the file.';
                this.showToast(this.fileError, 'error'); // Show error toast for file reading error
            };

            reader.readAsDataURL(file); // Read file as Data URL
        }
    }
  }


  onAddPartnerSubmit(addAnother: boolean): void {
    if (this.addPartnerForm.valid) {
      const newPartnerName = this.addPartnerForm.get('name')?.value.trim();

      // Frontend validation for unique Partner name
      const PartnerExists = this.Partners.some(Partner => Partner.name.toLowerCase() === newPartnerName.toLowerCase());
      if (PartnerExists) {
        this.showToast('Partner already exists', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }

      // Set spinner state based on the action
      if (addAnother) {
        this.isSubmittingSaveAndAddAnother = true; // Start spinner for "Save and Add Another"
      } else {
        this.isSubmittingSave = true; // Start spinner for "Save"
      }

      const token = localStorage.getItem('token');
      if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmittingSave = false; // Stop spinner
        this.isSubmittingSaveAndAddAnother = false; // Stop spinner
        return;
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const contentFile = this.addPartnerForm.get('Partner_image_path')?.value;
  
      // Check if any file is selected (if file input is mandatory)
      if (!contentFile) {
        this.showToast('Please select an image to upload', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }
  
      // Preparing form data for the request
      const formData = new FormData();
      formData.append('name', this.addPartnerForm.get('name')?.value);
      formData.append('description', this.addPartnerForm.get('description')?.value);
      formData.append('partner_image_path', contentFile); // Attach the file
  
      this.uploadProgress = 0; // Reset upload progress for new upload
  
      this.PartnerService.addPartner(formData, headers).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              }
              break;
            case HttpEventType.Response:
              this.uploadProgress = -1; // Reset progress
              if (event.body?.success) {
                if (addAnother) {
                  this.addPartnerForm.reset(); // Clear the form for the next entry
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('Partner section added successfully. You can add another.', 'success');
                  this.fetchPartners();
                } else {
                  this.addPartnerForm.reset(); // Clear the form after submitting
                  this.addPopupVisible = false; // Close the add popup
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('Partner section added successfully', 'success');
                  this.fetchPartners();
                }
              } else {
                this.showToast(event.body?.message || 'Error adding Partner section', 'error');
              }
              if (addAnother) {
                this.isSubmittingSaveAndAddAnother = false;
              } else {
                this.isSubmittingSave = false;
              }
              break;
          }
        },
        (error: any) => {
          this.uploadProgress = -1; // Reset progress on error
          if (addAnother) {
            this.isSubmittingSaveAndAddAnother = false; // Stop spinner for "Save and Add Another"
          } else {
            this.isSubmittingSave = false; // Stop spinner for "Save"
          }
          if (error.status === 400 && error.error.errors) {
            this.showToast('Title already exists', 'error');
          } else {
            this.showToast('Error adding Partner section', 'error');
          }
        }
      );
    } else {
      // Show toast messages only for fields that are invalid
      Object.keys(this.addPartnerForm.controls).forEach(key => {
        const control = this.addPartnerForm.get(key);
        if (control && control.invalid && (control.value === null || control.value === '')) {
          const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
          this.showToast(`${fieldName} field is required`, 'error');
        }
      });
      this.isSubmittingSave = false;
      this.isSubmittingSaveAndAddAnother = false;
    }
  }

  onUpdatePartnerSubmit(): void {
    if (this.updatePartnerForm.valid) {
        const currentPartnerId = this.updatePartnerForm.get('id')?.value;
        const updatedPartnerTitle = this.updatePartnerForm.get('title')?.value.trim();
        const contentFile = this.updatePartnerForm.get('partner_image_path')?.value;

        // Frontend validation for unique Partner title (excluding the current Partner section)
        const PartnerExists = this.Partners.some(Partner => 
            Partner.name.toLowerCase() === updatedPartnerTitle.toLowerCase() && 
            Partner.id !== currentPartnerId
        );

        if (PartnerExists) {
            this.showToast('Partner name already exists in another record', 'error');
            this.isSubmitting = false;
            return;
        }

        this.isSubmitting = true; 

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmitting = false;
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formData = new FormData();

        // Prepare form data
        formData.append('name', this.updatePartnerForm.get('name')?.value || '');
        formData.append('description', this.updatePartnerForm.get('description')?.value || '');
        

        // Only append 'Partner_image_path' if a new file is selected
        if (contentFile && contentFile instanceof File) {
            formData.append('partner_image_path', contentFile);
        }

        this.uploadProgress = 0; // Reset upload progress for new upload

        // Ensure that the 'id' is passed in the URL, not in the FormData
        this.PartnerService.updatePartner(currentPartnerId, formData, headers).subscribe(
            (event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        if (event.total) {
                            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                        }
                        break;
                    case HttpEventType.Response:
                        this.uploadProgress = -1; // Reset progress
                        if (event.body?.success) {
                            this.fetchPartners(); // Refresh the Partner section list
                            this.updatePartnerForm.reset(); // Clear the form after submitting
                            this.updatePopupVisible = false; // Close the update popup
                            this.showToast('Partner section updated successfully', 'info');
                        } else {
                            this.showToast(event.body?.message || 'Error updating Partner section', 'error');
                        }
                        this.isSubmitting = false; // Stop spinner
                        break;
                }
            },
            (error: any) => {
                this.uploadProgress = -1; // Reset progress on error
                this.isSubmitting = false; // Stop spinner

                // Handle validation errors from backend
                if (error.status === 400 && error.error.error) {
                    const errors = error.error.error;
                    Object.keys(errors).forEach(key => {
                        const messages = errors[key];
                        this.showToast(`${key}: ${messages.join(', ')}`, 'error');
                    });
                } else {
                    this.showToast('Error updating Partner section', 'error');
                }
            }
        );
    } else {
        // Show toast messages for invalid fields
        Object.keys(this.updatePartnerForm.controls).forEach(key => {
            const control = this.updatePartnerForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; 
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
        this.isSubmitting = false; // Stop spinner
    }
  }

  

  onPopupHidden() {
    this.fetchPartners();
  }

  funcEditDetails(data: any) {
    this.updatePartnerForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }



  // This is a placeholder for your logic to handle different file types
  isFileType() {
    const selectedType = this.updatePartnerForm.get('type')?.value;
    return selectedType === 'pdf' || selectedType === 'image'; // Adjust based on your use case
  }
  // Manually reset the file input field
  resetFileInput(): void {
      if (this.fileInput) {
          this.fileInput.nativeElement.value = ''; // Clear the file input
      }
  }


  funcDeleteDetails(data:any) {
    this.deletePartnerForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeletePartnerSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deletePartnerForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.PartnerService.deletePartner(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchPartners(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Partner deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Partner', 'error');
        }
    );
  }


  onDeleteMultiplePartnerSubmit(): void {
    const selectedPartners = this.multiplePartnerGrid.instance.getSelectedRowsData();
    if (selectedPartners.length === 0) {
        this.showToast('No course Partners selected.', 'error');
        return;
    }

    // Store the selected Partners for deletion and their count
    this.selectedPartnerForDeletion = selectedPartners;
    this.selectedPartnerCount = selectedPartners.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultiplePartner(): void {
      this.isSubmitting = true;  // Start spinner

      const PartnerIds = this.selectedPartnerForDeletion.map((Partner: any) => Partner.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.PartnerService.deleteMultiplePartners(PartnerIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchPartners();  // Refresh the Partner list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedPartnerCount} Partner deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Partners', 'error');
          }
      );
  }
 

  permitPartnerActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedPartners = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Partner: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Partner) {
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
        console.warn(`Unsupported toast Partner: ${Partner}`);
        break;
    }
  }
}
