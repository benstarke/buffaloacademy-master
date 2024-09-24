import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Footer } from '../footer.model';
import { FooterService } from '../footer.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-footer-mgmt',
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
  templateUrl: './footer-mgmt.component.html',
  styleUrl: './footer-mgmt.component.css'
})
export class FooterMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addFooterForm: FormGroup;
  updateFooterForm: FormGroup;
  deleteFooterForm: FormGroup;
  Footers: Footer[] = [];
  noFootersMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedFooters: Footer[] = [];

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
  selectedFooterForDeletion: any[] = [];  
  selectedFooterCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleFooterGrid', { static: false }) multipleFooterGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) FootersGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;  // Use '!' to tell TypeScript that this will be initialized later


  permitFooterMenuItems = [
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
  permitGeneralFooterMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Footer', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Footer', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Footer':
            this.onAddFooterClick();
            break;
        case 'delete_Footer':
            this.onDeleteMultipleFooterSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private FooterService: FooterService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addFooterForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });

    this.updateFooterForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });

    this.deleteFooterForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      title: 'Footer Title',
      logo: 'System logo',
      description: 'Description',
      year: 'System year',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchFooters();
  }


  fetchFooters(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.FooterService.getFooters().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Footers = response.data;
          this.noFootersMessage = '';
        } else {
          this.Footers = [];
          this.noFootersMessage = response.message;
          this.showToast(this.noFootersMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Footer === 404 && error.error && error.error.message === 'No Footers found!') {
          this.Footers = [];
          this.noFootersMessage = error.error.message;
          this.showToast(this.noFootersMessage, 'info');
        } else {
          this.noFootersMessage = 'Error fetching Footers';
          this.showToast(this.noFootersMessage, 'error');
        }
      }
    );
  }

  onAddFooterClick(): void {
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
            this.addFooterForm.get('logo')?.setErrors({ invalidFileType: true });
            this.showToast(this.fileError, 'error'); // Show error toast for invalid file type
        } else if (file.size > 5000000) { // 5 MB max size
            this.fileError = 'File size exceeds the maximum allowed limit of 5 MB.';
            this.addFooterForm.get('logo')?.setErrors({ fileSizeExceeded: true });
            this.showToast(this.fileError, 'error'); // Show error toast for exceeding file size
        } else {
            this.fileError = null; // Clear previous errors
            this.addFooterForm.patchValue({ logo: file }); // Set the selected file to the form

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


  onAddFooterSubmit(addAnother: boolean): void {
    if (this.addFooterForm.valid) {
      const newFooterName = this.addFooterForm.get('title')?.value.trim();

      // Frontend validation for unique Footer name
      const FooterExists = this.Footers.some(Footer => Footer.title.toLowerCase() === newFooterName.toLowerCase());
      if (FooterExists) {
        this.showToast('Footer title already exists', 'error');
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
      const contentFile = this.addFooterForm.get('logo')?.value;
  
      // Check if any file is selected (if file input is mandatory)
      if (!contentFile) {
        this.showToast('Please select an image to upload', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }
  
      // Preparing form data for the request
      const formData = new FormData();
      formData.append('title', this.addFooterForm.get('title')?.value);
      formData.append('description', this.addFooterForm.get('description')?.value);
      formData.append('year', this.updateFooterForm.get('year')?.value || '');
      formData.append('logo', contentFile); // Attach the file
  
      this.uploadProgress = 0; // Reset upload progress for new upload
  
      this.FooterService.addFooter(formData, headers).subscribe(
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
                  this.addFooterForm.reset(); // Clear the form for the next entry
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('Footer section added successfully. You can add another.', 'success');
                  this.fetchFooters();
                } else {
                  this.addFooterForm.reset(); // Clear the form after submitting
                  this.addPopupVisible = false; // Close the add popup
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('Footer section added successfully', 'success');
                  this.fetchFooters();
                }
              } else {
                this.showToast(event.body?.message || 'Error adding Footer section', 'error');
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
            this.showToast('Error adding Footer section', 'error');
          }
        }
      );
    } else {
      // Show toast messages only for fields that are invalid
      Object.keys(this.addFooterForm.controls).forEach(key => {
        const control = this.addFooterForm.get(key);
        if (control && control.invalid && (control.value === null || control.value === '')) {
          const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
          this.showToast(`${fieldName} field is required`, 'error');
        }
      });
      this.isSubmittingSave = false;
      this.isSubmittingSaveAndAddAnother = false;
    }
  }

  onUpdateFooterSubmit(): void {
    if (this.updateFooterForm.valid) {
        const currentFooterId = this.updateFooterForm.get('id')?.value;
        const updatedFooterTitle = this.updateFooterForm.get('title')?.value.trim();
        const contentFile = this.updateFooterForm.get('logo')?.value;

        // Frontend validation for unique Footer title (excluding the current Footer section)
        const FooterExists = this.Footers.some(Footer => 
            Footer.title.toLowerCase() === updatedFooterTitle.toLowerCase() && 
            Footer.id !== currentFooterId
        );

        if (FooterExists) {
            this.showToast('Footer title already exists in another record', 'error');
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
        formData.append('title', this.updateFooterForm.get('title')?.value || '');
        formData.append('description', this.updateFooterForm.get('description')?.value || '');
        formData.append('year', this.updateFooterForm.get('year')?.value || '');

        // Only append 'logo' if a new file is selected
        if (contentFile && contentFile instanceof File) {
            formData.append('logo', contentFile);
        }

        this.uploadProgress = 0; // Reset upload progress for new upload

        // Ensure that the 'id' is passed in the URL, not in the FormData
        this.FooterService.updateFooter(currentFooterId, formData, headers).subscribe(
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
                            this.fetchFooters(); // Refresh the Footer section list
                            this.updateFooterForm.reset(); // Clear the form after submitting
                            this.updatePopupVisible = false; // Close the update popup
                            this.showToast('Footer section updated successfully', 'info');
                        } else {
                            this.showToast(event.body?.message || 'Error updating Footer section', 'error');
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
                    this.showToast('Error updating Footer section', 'error');
                }
            }
        );
    } else {
        // Show toast messages for invalid fields
        Object.keys(this.updateFooterForm.controls).forEach(key => {
            const control = this.updateFooterForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; 
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
        this.isSubmitting = false; // Stop spinner
    }
  }

  

  onPopupHidden() {
    this.fetchFooters();
  }

  funcEditDetails(data: any) {
    this.updateFooterForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }



  // This is a placeholder for your logic to handle different file types
  isFileType() {
    const selectedType = this.updateFooterForm.get('type')?.value;
    return selectedType === 'pdf' || selectedType === 'image'; // Adjust based on your use case
  }
  // Manually reset the file input field
  resetFileInput(): void {
      if (this.fileInput) {
          this.fileInput.nativeElement.value = ''; // Clear the file input
      }
  }


  funcDeleteDetails(data:any) {
    this.deleteFooterForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteFooterSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteFooterForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.FooterService.deleteFooter(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchFooters(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Footer deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Footer', 'error');
        }
    );
  }


  onDeleteMultipleFooterSubmit(): void {
    const selectedFooters = this.multipleFooterGrid.instance.getSelectedRowsData();
    if (selectedFooters.length === 0) {
        this.showToast('No course Footers selected.', 'error');
        return;
    }

    // Store the selected Footers for deletion and their count
    this.selectedFooterForDeletion = selectedFooters;
    this.selectedFooterCount = selectedFooters.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleFooter(): void {
      this.isSubmitting = true;  // Start spinner

      const FooterIds = this.selectedFooterForDeletion.map((Footer: any) => Footer.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.FooterService.deleteMultipleFooters(FooterIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchFooters();  // Refresh the Footer list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedFooterCount} Footer deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Footers', 'error');
          }
      );
  }
 

  permitFooterActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedFooters = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Footer: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Footer) {
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
        console.warn(`Unsupported toast Footer: ${Footer}`);
        break;
    }
  }
}
