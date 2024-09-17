import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Curriculum } from '../curriculum.model'; 
import { CurriculumService } from '../curriculum.service'; 
import { CourseService } from '../../courses/course.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-coursecurriculum-mgmt',
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
  templateUrl: './coursecurriculum-mgmt.component.html',
  styleUrl: './coursecurriculum-mgmt.component.css'
})
export class CoursecurriculumMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addCurriculumForm: FormGroup;
  updateCurriculumForm: FormGroup;
  deleteCurriculumForm: FormGroup;
  Curriculums: Curriculum[] = [];
  noCurriculumsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedCurriculums: Curriculum[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // courses
  Course: any[] = [];

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedCurriculumForDeletion: any[] = [];  
  selectedCurriculumCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleCurriculumGrid', { static: false }) multipleCurriculumGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) CurriculumsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitCurriculumMenuItems = [
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
  permitGeneralCurriculumMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Curriculum', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Curriculum', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Curriculum':
            this.onAddCurriculumClick();
            break;
        case 'delete_Curriculum':
            this.onDeleteMultipleCurriculumSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private CurriculumService: CurriculumService, 
    public toastr: ToastrService,
    private courseService: CourseService,
    private http: HttpClient, ) {
    this.addCurriculumForm = new FormGroup({
      name: new FormControl('', Validators.required),
      course_id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateCurriculumForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      course_id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteCurriculumForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      course_id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      name: 'Name',
      course_id: 'Course Name',
      description: 'Description',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchCurriculums();
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.Course = courses; // Directly assign the response
        console.log('Courses fetched successfully:', courses); // Success message with data
      },
      (error) => {
        console.error('Error fetching courses:', error);
        // Handle error, show message, etc.
      }
    );
  }

  fetchCurriculums(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.CurriculumService.getCurriculums().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Curriculums = response.data;
          this.noCurriculumsMessage = '';
        } else {
          this.Curriculums = [];
          this.noCurriculumsMessage = response.message;
          this.showToast(this.noCurriculumsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Curriculum === 404 && error.error && error.error.message === 'No Curriculums found!') {
          this.Curriculums = [];
          this.noCurriculumsMessage = error.error.message;
          this.showToast(this.noCurriculumsMessage, 'info');
        } else {
          this.noCurriculumsMessage = 'Error fetching Curriculums';
          this.showToast(this.noCurriculumsMessage, 'error');
        }
      }
    );
  }

  onAddCurriculumClick(): void {
    this.addPopupVisible = true;
  }

  onAddCurriculumSubmit(addAnother: boolean): void {
    if (this.addCurriculumForm.valid) {
        const newCurriculumName = this.addCurriculumForm.get('name')?.value.trim();

        // Frontend validation for unique Curriculum name
        const CurriculumExists = this.Curriculums.some(Curriculum => Curriculum.name.toLowerCase() === newCurriculumName.toLowerCase());
        if (CurriculumExists) {
            this.showToast('Curriculum name already exists', 'error');
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
            ...this.addCurriculumForm.value,
        };

        this.CurriculumService.addCurriculum(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchCurriculums(); // Refresh the Curriculum list
                    if (addAnother) {
                        this.addCurriculumForm.reset(); // Clear the form for the next entry
                        this.showToast('Curriculum added successfully. You can add another.', 'success');
                    } else {
                        this.addCurriculumForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Curriculum added successfully', 'success');
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
                    this.showToast('Curriculum already exists', 'error');
                } else {
                    this.showToast('Error adding Curriculum', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addCurriculumForm.controls).forEach(key => {
            const control = this.addCurriculumForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  onPopupHidden() {
    this.fetchCurriculums();
  }

  funcEditDetails(data: any) {
    this.updateCurriculumForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateCurriculumSubmit(): void {
    if (this.updateCurriculumForm.valid) {
        const updatedCurriculumName = this.updateCurriculumForm.get('name')?.value.trim();
        const currentCurriculumId = this.updateCurriculumForm.get('id')?.value;

        // Frontend validation for unique Curriculum name (excluding the current Curriculum being edited)
        const CurriculumExists = this.Curriculums.some(Curriculum => 
            Curriculum.name.toLowerCase() === updatedCurriculumName.toLowerCase() && 
            Curriculum.id !== currentCurriculumId
        );

        if (CurriculumExists) {
            this.showToast('Course Curriculum name already exists in another record', 'error');
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
        const updatedCurriculum = {
            ...this.updateCurriculumForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.CurriculumService.updateCurriculum(updatedCurriculum, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchCurriculums(); // Refresh the tag list
                this.updateCurriculumForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Course Curriculum updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course Curriculum', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateCurriculumForm.controls).forEach(key => {
            const control = this.updateCurriculumForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  funcDeleteDetails(data:any) {
    this.deleteCurriculumForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteCurriculumSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteCurriculumForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.CurriculumService.deleteCurriculum(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchCurriculums(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Curriculum deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Curriculum', 'error');
        }
    );
  }


  onDeleteMultipleCurriculumSubmit(): void {
    const selectedCurriculums = this.multipleCurriculumGrid.instance.getSelectedRowsData();
    if (selectedCurriculums.length === 0) {
        this.showToast('No course Curriculums selected.', 'error');
        return;
    }

    // Store the selected Curriculums for deletion and their count
    this.selectedCurriculumForDeletion = selectedCurriculums;
    this.selectedCurriculumCount = selectedCurriculums.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleCurriculum(): void {
      this.isSubmitting = true;  // Start spinner

      const CurriculumIds = this.selectedCurriculumForDeletion.map((Curriculum: any) => Curriculum.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.CurriculumService.deleteMultipleCurriculums(CurriculumIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchCurriculums();  // Refresh the Curriculum list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedCurriculumCount} Curriculum(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Curriculums', 'error');
          }
      );
  }
 

  permitCurriculumActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedCurriculums = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Curriculum: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Curriculum) {
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
        console.warn(`Unsupported toast Curriculum: ${Curriculum}`);
        break;
    }
  }
}
