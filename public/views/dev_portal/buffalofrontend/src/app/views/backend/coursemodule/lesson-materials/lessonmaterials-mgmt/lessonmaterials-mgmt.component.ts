import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../material.model'; 
import { MaterialService } from '../material.services'; 
import { LessonService } from '../../curriculum-lessons/lesson.services'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-courseMaterial-mgmt',
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
  templateUrl: './lessonmaterials-mgmt.component.html',
  styleUrl: './lessonmaterials-mgmt.component.css'
})
export class LessonmaterialsMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addMaterialForm: FormGroup;
  updateMaterialForm: FormGroup;
  deleteMaterialForm: FormGroup;
  Materials: Material[] = [];
  noMaterialsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedMaterials: Material[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // lessons
  Lesson: any[] = [];

  // file uploads
  // Other properties
  fileError: string | null = null; // Declare fileError with initial value null
  uploadProgress: number = -1; // Initialize upload progress to -1 to hide progress bar initially


  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedMaterialForDeletion: any[] = [];  
  selectedMaterialCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleMaterialGrid', { static: false }) multipleMaterialGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) MaterialsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;  // Use '!' to tell TypeScript that this will be initialized later


  // material type otpions
  materialTypeOptions = [
    { value: 'video', text: 'Video' },
    { value: 'document', text: 'Document' },
    { value: 'zipped', text: 'Zipped file' },
    { value: 'dataset', text: 'Dataset' },
    // { value: 'quiz', text: 'Questions' },
    { value: 'others', text: 'Others' },
  ];

  permitMaterialMenuItems = [
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
  permitGeneralMaterialMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Material', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Material', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Material':
            this.onAddMaterialClick();
            break;
        case 'delete_Material':
            this.onDeleteMultipleMaterialSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private MaterialService: MaterialService, 
    public toastr: ToastrService,
    private lessonService: LessonService,
    private http: HttpClient, ) {
    this.addMaterialForm = new FormGroup({
      title: new FormControl('', Validators.required),
      lesson_id: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

    this.updateMaterialForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      lesson_id: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      content: new FormControl('')
    });

    this.deleteMaterialForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      lesson_id: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      title: 'Material Title',
      lesson_id: 'Lesson of concern',
      type: 'Material type',
      content: 'Material content',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchMaterials();
    this.fetchLessons();
  }

  fetchLessons() {
    this.lessonService.getLessons().subscribe(
      (response: any) => {
        console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Lesson = response.data; // Assign the 'data' array to the Lesson property
          console.log('Lessons fetched successfully:', this.Lesson); // Log the fetched lessons
        } else {
          console.warn('Lessons fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching lessons:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  fetchMaterials(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.MaterialService.getMaterials().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Materials = response.data;
          this.noMaterialsMessage = '';
        } else {
          this.Materials = [];
          this.noMaterialsMessage = response.message;
          this.showToast(this.noMaterialsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Material === 404 && error.error && error.error.message === 'No Materials found!') {
          this.Materials = [];
          this.noMaterialsMessage = error.error.message;
          this.showToast(this.noMaterialsMessage, 'info');
        } else {
          this.noMaterialsMessage = 'Error fetching Materials';
          this.showToast(this.noMaterialsMessage, 'error');
        }
      }
    );
  }

  onAddMaterialClick(): void {
    this.addPopupVisible = true;
  }

  // Define accepted file types for different material types
  getAcceptForFileType(): string {
    const selectedType = this.addMaterialForm.get('type')?.value;

    switch (selectedType) {
        case 'video':
            return 'video/mp4, video/quicktime, video/x-msvideo, video/mov, video/avi, video/mpeg'; // Correct MIME types for common video files
        case 'document':
            return 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv';
        case 'zipped':
            return 'application/zip, application/x-zip-compressed, application/x-compressed-zip, multipart/x-zip'; // Add multiple zip MIME types
        case 'dataset':
            return 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv';
        default:
            return '*/*'; // Allow any file type for 'others'
    }
}



  // Handle file selection and perform frontend file validation
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
        const selectedType = this.addMaterialForm.get('type')?.value;
        const fileExtension = file.name.split('.').pop().toLowerCase(); // Extract file extension

        // Allowed MIME types and file extensions for video files
        const allowedVideoMimeTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/mpeg'];
        const allowedVideoExtensions = ['mp4', 'mov', 'avi', 'mpg']; // Use common video file extensions

        // Check if file is a video and has valid extension
        if (selectedType === 'video' && 
            (!allowedVideoMimeTypes.includes(file.type) || !allowedVideoExtensions.includes(fileExtension))) {
            this.fileError = `Please upload a valid video file (mp4, mov, avi, mpg).`;
            this.addMaterialForm.get('content')?.setErrors({ invalidFileType: true });
            this.showToast(this.fileError, 'error'); // Show error toast for invalid file type
        } else if (file.size > 100000000) { // 10 MB max size
            this.fileError = 'File size exceeds the maximum allowed limit of 100 MB.';
            this.addMaterialForm.get('content')?.setErrors({ fileSizeExceeded: true });
            this.showToast(this.fileError, 'error'); // Show error toast for exceeding file size
        } else {
            this.fileError = null; // Clear previous errors
            this.addMaterialForm.patchValue({ content: file }); // Set the selected file to the form

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



  onAddMaterialSubmit(addAnother: boolean): void {
    if (this.addMaterialForm.valid) {
      const newMaterialName = this.addMaterialForm.get('title')?.value.trim();

      // Frontend validation for unique Material name
      const materialExists = this.Materials.some(material => material.title.toLowerCase() === newMaterialName.toLowerCase());
      if (materialExists) {
        this.showToast('Material title already exists', 'error');
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
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmittingSave = false; // Stop spinner
        this.isSubmittingSaveAndAddAnother = false; // Stop spinner
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      const selectedType = this.addMaterialForm.get('type')?.value;
      const contentFile = this.addMaterialForm.get('content')?.value;

      // Check for valid file type based on selected material type
      const allowedVideoTypes = ['mp4', 'mov', 'avi', 'mpg'];
      const fileExtension = contentFile ? contentFile.name.split('.').pop().toLowerCase() : '';

      if (selectedType === 'video' && !allowedVideoTypes.includes(fileExtension)) {
        this.showToast('Please upload a valid video file (mp4, mov, avi, mpg)', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }

      // Check if any file is selected
      if (!contentFile) {
        this.showToast('Please select a file to upload', 'error');
        this.isSubmittingSave = false;
        this.isSubmittingSaveAndAddAnother = false;
        return;
      }

      // Preparing form data for the request
      const formData = new FormData();
      formData.append('title', this.addMaterialForm.get('title')?.value);
      formData.append('lesson_id', this.addMaterialForm.get('lesson_id')?.value);
      formData.append('type', selectedType);
      formData.append('content', contentFile); // Attach the file
      formData.append('created_by', token); // user identity is stored in the token

      this.uploadProgress = 0; // Reset upload progress for new upload

      this.MaterialService.addMaterial(formData, headers).subscribe(
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
                this.fetchMaterials(); // Refresh the Material list
                if (addAnother) {
                  this.addMaterialForm.reset(); // Clear the form for the next entry
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('Material added successfully. You can add another.', 'success');
                } else {
                  this.addMaterialForm.reset(); // Clear the form after submitting
                  this.addPopupVisible = false; // Close the add popup
                  this.resetFileInput(); // Reset the file input manually
                  this.showToast('Material added successfully', 'success');
                }
              } else {
                this.showToast(event.body?.message || 'Error adding Material', 'error');
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

          if (error.status === 422 && error.error.errors) {
            this.showToast('Material already exists', 'error');
          } else {
            this.showToast('Error adding Material', 'error');
          }
        }
      );
    } else {
      // Show toast messages only for fields that are invalid
      Object.keys(this.addMaterialForm.controls).forEach(key => {
        const control = this.addMaterialForm.get(key);
        if (control && control.invalid && (control.value === null || control.value === '')) {
          const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
          this.showToast(`${fieldName} field is required`, 'error');
        }
      });
      this.isSubmittingSave = false;
      this.isSubmittingSaveAndAddAnother = false;
    }
  }

  onPopupHidden() {
    this.fetchMaterials();
  }

  funcEditDetails(data: any) {
    this.updateMaterialForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateMaterialSubmit(): void {
    if (this.updateMaterialForm.valid) {
        const currentMaterialId = this.updateMaterialForm.get('id')?.value;
        const updatedMaterialName = this.updateMaterialForm.get('title')?.value.trim();
        const selectedType = this.updateMaterialForm.get('type')?.value;
        const contentFile = this.updateMaterialForm.get('content')?.value;

        // Frontend validation for unique material title (excluding current material)
        const materialExists = this.Materials.some(material => 
            material.title.toLowerCase() === updatedMaterialName.toLowerCase() && 
            material.id !== currentMaterialId
        );

        if (materialExists) {
            this.showToast('Material title already exists in another record', 'error');
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
        formData.append('title', this.updateMaterialForm.get('title')?.value || '');
        formData.append('lesson_id', this.updateMaterialForm.get('lesson_id')?.value || '');
        formData.append('type', selectedType || '');

        // Only append 'content' if a new file is selected
        if (contentFile && contentFile instanceof File) {
            formData.append('content', contentFile);
        }

        // 'updated_by' is handled by the backend based on the token/user, so it's optional to send it from frontend
        // Remove the following line if the backend manages 'updated_by'
        // formData.append('updated_by', localStorage.getItem('email') || 'Unknown');

        // Debugging FormData (optional, remove in production)
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        this.uploadProgress = 0; 

        // Ensure that the 'id' is passed in the URL, not in the FormData
        this.MaterialService.updateMaterial(currentMaterialId, formData, headers).subscribe(
            (event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        if (event.total) {
                            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                        }
                        break;
                    case HttpEventType.Response:
                        this.uploadProgress = -1; 
                        if (event.body?.success) {
                            this.fetchMaterials(); 
                            this.updateMaterialForm.reset(); 
                            this.updatePopupVisible = false; 
                            this.showToast('Material updated successfully', 'info');
                        } else {
                            this.showToast(event.body?.message || 'Error updating material', 'error');
                        }
                        this.isSubmitting = false; 
                        break;
                }
            },
            (error: any) => {
                this.uploadProgress = -1;
                this.isSubmitting = false; 
                // Handle validation errors from backend
                if (error.status === 400 && error.error.error) {
                    const errors = error.error.error;
                    Object.keys(errors).forEach(key => {
                        const messages = errors[key];
                        this.showToast(`${key}: ${messages.join(', ')}`, 'error');
                    });
                } else {
                    this.showToast('Error updating material', 'error');
                }
            }
        );
    } else {
        // Show toast messages for invalid fields
        Object.keys(this.updateMaterialForm.controls).forEach(key => {
            const control = this.updateMaterialForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; 
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
        this.isSubmitting = false; 
    }
}




  // This is a placeholder for your logic to handle different file types
  isFileType() {
    const selectedType = this.updateMaterialForm.get('type')?.value;
    return selectedType === 'pdf' || selectedType === 'image'; // Adjust based on your use case
  }
  // Manually reset the file input field
  resetFileInput(): void {
      if (this.fileInput) {
          this.fileInput.nativeElement.value = ''; // Clear the file input
      }
  }


  funcDeleteDetails(data:any) {
    this.deleteMaterialForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteMaterialSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteMaterialForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.MaterialService.deleteMaterial(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchMaterials(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Material deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Material', 'error');
        }
    );
  }


  onDeleteMultipleMaterialSubmit(): void {
    const selectedMaterials = this.multipleMaterialGrid.instance.getSelectedRowsData();
    if (selectedMaterials.length === 0) {
        this.showToast('No course Materials selected.', 'error');
        return;
    }

    // Store the selected Materials for deletion and their count
    this.selectedMaterialForDeletion = selectedMaterials;
    this.selectedMaterialCount = selectedMaterials.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleMaterial(): void {
      this.isSubmitting = true;  // Start spinner

      const MaterialIds = this.selectedMaterialForDeletion.map((Material: any) => Material.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.MaterialService.deleteMultipleMaterials(MaterialIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchMaterials();  // Refresh the Material list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedMaterialCount} Material(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Materials', 'error');
          }
      );
  }
 

  permitMaterialActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedMaterials = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Material: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Material) {
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
        console.warn(`Unsupported toast Material: ${Material}`);
        break;
    }
  }
}
