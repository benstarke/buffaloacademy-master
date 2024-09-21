import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { About } from '../about.model'; 
import { AboutService } from '../about.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-about-mgmt',
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
  templateUrl: './about-mgmt.component.html',
  styleUrl: './about-mgmt.component.css'
})
export class AboutMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addAboutForm: FormGroup;
  updateAboutForm: FormGroup;
  deleteAboutForm: FormGroup;
  Abouts: About[] = [];
  noAboutsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedAbouts: About[] = [];

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
  selectedAboutForDeletion: any[] = [];  
  selectedAboutCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleAboutGrid', { static: false }) multipleAboutGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) AboutsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;  // Use '!' to tell TypeScript that this will be initialized later


  permitAboutMenuItems = [
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
  permitGeneralAboutMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_About', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_About', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_About':
            this.onAddAboutClick();
            break;
        case 'delete_About':
            this.onDeleteMultipleAboutSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private AboutService: AboutService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addAboutForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      who_we_are: new FormControl('', Validators.required),
      our_mission: new FormControl('', Validators.required),
      about_image_path: new FormControl('')
    });

    this.updateAboutForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      who_we_are: new FormControl('', Validators.required),
      our_mission: new FormControl('', Validators.required),
      about_image_path: new FormControl('')
    });

    this.deleteAboutForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      who_we_are: new FormControl('', Validators.required),
      our_mission: new FormControl('', Validators.required),
      about_image_path: new FormControl('')
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      title: 'About Title',
      about_image_path: 'About Image',
      description: 'Description',
      who_we_are: 'Who We Are',
      our_mission: 'Buffalo Academy Mission',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchAbouts();
  }


  fetchAbouts(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.AboutService.getAbouts().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Abouts = response.data;
          this.noAboutsMessage = '';
        } else {
          this.Abouts = [];
          this.noAboutsMessage = response.message;
          this.showToast(this.noAboutsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.About === 404 && error.error && error.error.message === 'No Abouts found!') {
          this.Abouts = [];
          this.noAboutsMessage = error.error.message;
          this.showToast(this.noAboutsMessage, 'info');
        } else {
          this.noAboutsMessage = 'Error fetching Abouts';
          this.showToast(this.noAboutsMessage, 'error');
        }
      }
    );
  }

  onAddAboutClick(): void {
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
            this.addAboutForm.get('about_image_path')?.setErrors({ invalidFileType: true });
            this.showToast(this.fileError, 'error'); // Show error toast for invalid file type
        } else if (file.size > 5000000) { // 5 MB max size
            this.fileError = 'File size exceeds the maximum allowed limit of 5 MB.';
            this.addAboutForm.get('about_image_path')?.setErrors({ fileSizeExceeded: true });
            this.showToast(this.fileError, 'error'); // Show error toast for exceeding file size
        } else {
            this.fileError = null; // Clear previous errors
            this.addAboutForm.patchValue({ about_image_path: file }); // Set the selected file to the form

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


  onAddAboutSubmit(addAnother: boolean): void {
    if (this.addAboutForm.valid) {
      const newAboutName = this.addAboutForm.get('title')?.value.trim();

      // Frontend validation for unique About name
      const AboutExists = this.Abouts.some(About => About.title.toLowerCase() === newAboutName.toLowerCase());
      if (AboutExists) {
        this.showToast('About title already exists', 'error');
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
      const contentFile = this.addAboutForm.get('about_image_path')?.value;
  
      // Check if any file is selected (if file input is mandatory)
      if (!contentFile) {
        this.showToast('Please select an image to upload', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }
  
      // Preparing form data for the request
      const formData = new FormData();
      formData.append('title', this.addAboutForm.get('title')?.value);
      formData.append('description', this.addAboutForm.get('description')?.value);
      formData.append('who_we_are', this.addAboutForm.get('who_we_are')?.value);
      formData.append('our_mission', this.addAboutForm.get('our_mission')?.value);
      formData.append('about_image_path', contentFile); // Attach the file
  
      this.uploadProgress = 0; // Reset upload progress for new upload
  
      this.AboutService.addAbout(formData, headers).subscribe(
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
                  this.addAboutForm.reset(); // Clear the form for the next entry
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('About section added successfully. You can add another.', 'success');
                  this.fetchAbouts();
                } else {
                  this.addAboutForm.reset(); // Clear the form after submitting
                  this.addPopupVisible = false; // Close the add popup
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('About section added successfully', 'success');
                  this.fetchAbouts();
                }
              } else {
                this.showToast(event.body?.message || 'Error adding About section', 'error');
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
            this.showToast('Error adding About section', 'error');
          }
        }
      );
    } else {
      // Show toast messages only for fields that are invalid
      Object.keys(this.addAboutForm.controls).forEach(key => {
        const control = this.addAboutForm.get(key);
        if (control && control.invalid && (control.value === null || control.value === '')) {
          const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
          this.showToast(`${fieldName} field is required`, 'error');
        }
      });
      this.isSubmittingSave = false;
      this.isSubmittingSaveAndAddAnother = false;
    }
  }

  onUpdateAboutSubmit(): void {
    if (this.updateAboutForm.valid) {
        const currentAboutId = this.updateAboutForm.get('id')?.value;
        const updatedAboutTitle = this.updateAboutForm.get('title')?.value.trim();
        const contentFile = this.updateAboutForm.get('about_image_path')?.value;

        // Frontend validation for unique About title (excluding the current About section)
        const aboutExists = this.Abouts.some(about => 
            about.title.toLowerCase() === updatedAboutTitle.toLowerCase() && 
            about.id !== currentAboutId
        );

        if (aboutExists) {
            this.showToast('About title already exists in another record', 'error');
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
        formData.append('title', this.updateAboutForm.get('title')?.value || '');
        formData.append('description', this.updateAboutForm.get('description')?.value || '');
        formData.append('who_we_are', this.updateAboutForm.get('who_we_are')?.value || '');
        formData.append('our_mission', this.updateAboutForm.get('our_mission')?.value || '');

        // Only append 'about_image_path' if a new file is selected
        if (contentFile && contentFile instanceof File) {
            formData.append('about_image_path', contentFile);
        }

        this.uploadProgress = 0; // Reset upload progress for new upload

        // Ensure that the 'id' is passed in the URL, not in the FormData
        this.AboutService.updateAbout(currentAboutId, formData, headers).subscribe(
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
                            this.fetchAbouts(); // Refresh the About section list
                            this.updateAboutForm.reset(); // Clear the form after submitting
                            this.updatePopupVisible = false; // Close the update popup
                            this.showToast('About section updated successfully', 'info');
                        } else {
                            this.showToast(event.body?.message || 'Error updating About section', 'error');
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
                    this.showToast('Error updating About section', 'error');
                }
            }
        );
    } else {
        // Show toast messages for invalid fields
        Object.keys(this.updateAboutForm.controls).forEach(key => {
            const control = this.updateAboutForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; 
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
        this.isSubmitting = false; // Stop spinner
    }
  }

  

  onPopupHidden() {
    this.fetchAbouts();
  }

  funcEditDetails(data: any) {
    this.updateAboutForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }



  // This is a placeholder for your logic to handle different file types
  isFileType() {
    const selectedType = this.updateAboutForm.get('type')?.value;
    return selectedType === 'pdf' || selectedType === 'image'; // Adjust based on your use case
  }
  // Manually reset the file input field
  resetFileInput(): void {
      if (this.fileInput) {
          this.fileInput.nativeElement.value = ''; // Clear the file input
      }
  }


  funcDeleteDetails(data:any) {
    this.deleteAboutForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteAboutSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteAboutForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.AboutService.deleteAbout(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchAbouts(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('About deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course About', 'error');
        }
    );
  }


  onDeleteMultipleAboutSubmit(): void {
    const selectedAbouts = this.multipleAboutGrid.instance.getSelectedRowsData();
    if (selectedAbouts.length === 0) {
        this.showToast('No course Abouts selected.', 'error');
        return;
    }

    // Store the selected Abouts for deletion and their count
    this.selectedAboutForDeletion = selectedAbouts;
    this.selectedAboutCount = selectedAbouts.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleAbout(): void {
      this.isSubmitting = true;  // Start spinner

      const AboutIds = this.selectedAboutForDeletion.map((About: any) => About.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.AboutService.deleteMultipleAbouts(AboutIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchAbouts();  // Refresh the About list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedAboutCount} About deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Abouts', 'error');
          }
      );
  }
 

  permitAboutActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedAbouts = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, About: 'success' | 'error' | 'info' | 'warning'): void {
    switch (About) {
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
        console.warn(`Unsupported toast About: ${About}`);
        break;
    }
  }
}
