import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Lesson } from '../lesson.model'; 
import { LessonService } from '../lesson.services'; 
import { CurriculumService } from '../../course-curriculum/curriculum.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  DxDataGridModule, 
  DxButtonModule, 
  DxPopupModule, 
  DxFormModule, 
  DxTextBoxModule, 
  DxTextAreaModule, 
  DxMenuModule, 
  DxSelectBoxModule, 
  DxNumberBoxModule,
  DxTabPanelModule,} from 'devextreme-angular';
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
    DxNumberBoxModule,
    DxTabPanelModule,
  ],
  templateUrl: './curriculumlessons-mgmt.component.html',
  styleUrl: './curriculumlessons-mgmt.component.css'
})
export class CurriculumlessonsMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addLessonForm: FormGroup;
  updateLessonForm: FormGroup;
  // updateLessonFormStep1: FormGroup;
  // updateLessonFormStep2: FormGroup;
  // isStep1Complete: boolean = false; // To control step transitions


  deleteLessonForm: FormGroup;
  Lessons: Lesson[] = [];
  noLessonsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedLessons: Lesson[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // course curriculum
  Curriculum: any[] = [];

  // STEP FORMS
  // update
  currentStep: number = 1; // Track which step the user is on 
  // add
  selectedTabIndex: number = 0;
  tabSteps: any[] = [
    { index: 0, title: 'Step 1', valid: false },
    { index: 1, title: 'Step 2', valid: false },
    { index: 2, title: 'Preview', valid: false },
  ];

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedLessonForDeletion: any[] = [];  
  selectedLessonCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleLessonGrid', { static: false }) multipleLessonGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) LessonsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitLessonMenuItems = [
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
  permitGeneralLessonMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Lesson', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Lesson', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Lesson':
            this.onAddLessonClick();
            break;
        case 'delete_Lesson':
            this.onDeleteMultipleLessonSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private LessonService: LessonService, 
    public toastr: ToastrService,
    private curriculumService: CurriculumService,
    private http: HttpClient, ) {
    this.addLessonForm = new FormGroup({
      title: new FormControl('', Validators.required),
      course_curriculum_id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
      minutes: new FormControl('', Validators.required),
      seconds: new FormControl('', Validators.required)
    });
    

    this.updateLessonForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      course_curriculum_id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
      minutes: new FormControl('', Validators.required),
      seconds: new FormControl('', Validators.required)
    });

    this.deleteLessonForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      course_curriculum_id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
      minutes: new FormControl('', Validators.required),
      seconds: new FormControl('', Validators.required)
    });
  
    // Mapping for user-friendly field names
    this.fieldNames = {
      title: 'Lesson Title',
      course_curriculum_id: 'Course Curriculum Name',
      description: 'Description',
      notes: 'Lesson Notes',
      minutes: 'Lesson Minutes',
      seconds: 'Lesson Seconds',
    };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  // Tracks the current step in the add form
  currentAddStep: number = 1;

  ngOnInit(): void {
    this.fetchLessons();
    this.fetchCurriculumLessons();
    // tab step form
    // Initialize form and set validation watchers
    this.addLessonForm.statusChanges.subscribe(() => {
      this.updateTabStatus();
    });

    // Watch for form changes to update validation status dynamically
    this.addLessonForm.valueChanges.subscribe(() => {
      this.updateTabStatus();
    });
  }

  fetchCurriculumLessons() {
    this.curriculumService.getCurriculums().subscribe(
      (response: any) => {
        console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Curriculum = response.data; // Assign the 'data' array to the Lesson property
          console.log('Curriculum fetched successfully:', this.Curriculum); // Log the fetched Curriculum
        } else {
          console.warn('Curriculum fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Curriculum:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  fetchLessons(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.LessonService.getLessons().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Lessons = response.data;
          this.noLessonsMessage = '';
        } else {
          this.Lessons = [];
          this.noLessonsMessage = response.message;
          this.showToast(this.noLessonsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Lesson === 404 && error.error && error.error.message === 'No Lessons found!') {
          this.Lessons = [];
          this.noLessonsMessage = error.error.message;
          this.showToast(this.noLessonsMessage, 'info');
        } else {
          this.noLessonsMessage = 'Error fetching Lessons';
          this.showToast(this.noLessonsMessage, 'error');
        }
      }
    );
  }

  // ****************************************************** CREATE FUNCTIONALITY ***********************************************

  
  onAddLessonClick(): void {
    this.addPopupVisible = true;
    this.selectedTabIndex = 0;  // Start at step 1 (tab 1)
  }

  updateTabStatus(): void {
    // Step 1 validation
    this.tabSteps[0].valid = this.addLessonForm.get('title')?.valid &&
                             this.addLessonForm.get('course_curriculum_id')?.valid &&
                             this.addLessonForm.get('minutes')?.valid &&
                             this.addLessonForm.get('seconds')?.valid;
    
    // Step 2 validation (enabled if Step 1 is valid)
    if (this.tabSteps[0].valid) {
      this.tabSteps[1].valid = this.addLessonForm.get('description')?.valid &&
                               this.addLessonForm.get('notes')?.valid;
    } else {
      this.tabSteps[1].valid = false;
    }

    // Preview validation (enabled if Step 2 is valid)
    if (this.tabSteps[1].valid) {
      this.tabSteps[2].valid = true;
    } else {
      this.tabSteps[2].valid = false;
    }
  }

  // Function to move to the next tab
  goToNextAddStep(): void {
    if (this.tabSteps[this.selectedTabIndex].valid) {
      this.selectedTabIndex++;
    }
  }

  // Function to move to the previous tab
  goToPreviousAddStep(): void {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  // Allow moving to a tab only if the previous tab is valid
  canNavigateToTab(tabIndex: number): boolean {
    return this.tabSteps[tabIndex - 1]?.valid || tabIndex === 0;
  }


  onAddLessonSubmit(addAnother: boolean): void {
    if (this.addLessonForm.valid) {
        const newLessonTitle = this.addLessonForm.get('title')?.value.trim();

        // Frontend validation for unique Lesson Title
        const LessonExists = this.Lessons.some(Lesson => Lesson.title.toLowerCase() === newLessonTitle.toLowerCase());
        if (LessonExists) {
            this.showToast('Lesson title already exists', 'error');
            return;
        }

        // Set submission state
        if (addAnother) {
            this.isSubmittingSaveAndAddAnother = true;
        } else {
            this.isSubmittingSave = true;
        }

        // Check for token
        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmittingSave = false;
            this.isSubmittingSaveAndAddAnother = false;
            return;
        }

        // Set headers
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formValueWithCreatedBy = {
            ...this.addLessonForm.value,
        };

        // Submit form
        this.LessonService.addLesson(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                // Handle response
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;
                } else {
                    this.isSubmittingSave = false;
                }

                if (response.success) {
                    this.fetchLessons();
                    if (addAnother) {
                        this.addLessonForm.reset(); 
                        this.selectedTabIndex = 0; // Reset to Step 1
                        this.showToast('Lesson added successfully. You can add another.', 'success');
                    } else {
                        this.addLessonForm.reset();
                        this.addPopupVisible = false;
                        this.showToast('Lesson added successfully', 'success');
                    }
                } else {
                    this.showToast(response.message, 'error');
                }
            },
            (error: any) => {
                // Handle error
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;
                } else {
                    this.isSubmittingSave = false;
                }

                if (error.status === 422 && error.error.errors) {
                    this.showToast('Lesson already exists', 'error');
                } else {
                    this.showToast('Error adding Lesson', 'error');
                }
            }
        );
    } else {
        // Handle validation errors
        Object.keys(this.addLessonForm.controls).forEach(key => {
            const control = this.addLessonForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key;
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
}


  // ****************************************************** UPDATE FUNCTIONALITY ***********************************************

  funcEditDetails(data: any) {
    this.updateLessonForm.patchValue(data.data);
    this.currentStep = 1; // Reset to the first step when opening the popup
    this.updatePopupVisible = true;
  }

  goToNextStep(): void {
    if (this.currentStep === 1) {
        // Validate the fields of the first form
        if (this.updateLessonForm.get('title')?.valid &&
            this.updateLessonForm.get('course_curriculum_id')?.valid &&
            this.updateLessonForm.get('minutes')?.valid &&
            this.updateLessonForm.get('seconds')?.valid) {
            this.currentStep = 2; // Move to step 2
        } else {
            this.showToast('Please complete the required fields in step 1', 'error');
        }
    }
  }

  goToPreviousStep(): void {
      if (this.currentStep === 2) {
          this.currentStep = 1; // Move back to step 1
      }
  }

  onUpdateLessonSubmit(): void {
    if (this.currentStep === 2 && this.updateLessonForm.valid) {
        // Handle form submission logic after step 2 is validated
        const updatedLessonTitle = this.updateLessonForm.get('title')?.value.trim();
        const currentLessonId = this.updateLessonForm.get('id')?.value;

        const LessonExists = this.Lessons.some(Lesson =>
            Lesson.title.toLowerCase() === updatedLessonTitle.toLowerCase() &&
            Lesson.id !== currentLessonId
        );

        if (LessonExists) {
            this.showToast('Course Lesson title already exists in another record', 'error');
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
        const updatedLesson = {
            ...this.updateLessonForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.LessonService.updateLesson(updatedLesson, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchLessons(); // Refresh the list
                this.updateLessonForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the popup
                this.showToast('Course Lesson updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course Lesson', 'error');
            }
        );
    } else {
        // Show toast messages for missing fields
        Object.keys(this.updateLessonForm.controls).forEach(key => {
            const control = this.updateLessonForm.get(key);
            if (control && control.invalid) {
                const fieldName = this.fieldNames[key] || key;
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }


  // ****************************************************** DELETE ONE RECORD FUNCTIONALITY ***********************************************

  funcDeleteDetails(data:any) {
    this.deleteLessonForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteLessonSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteLessonForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.LessonService.deleteLesson(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchLessons(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Lesson deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Lesson', 'error');
        }
    );
  }


  // ****************************************************** DELETE MULTIPLE RECORDS FUNCTIONALITY ***********************************************
  onDeleteMultipleLessonSubmit(): void {
    const selectedLessons = this.multipleLessonGrid.instance.getSelectedRowsData();
    if (selectedLessons.length === 0) {
        this.showToast('No course Lessons selected.', 'error');
        return;
    }

    // Store the selected Lessons for deletion and their count
    this.selectedLessonForDeletion = selectedLessons;
    this.selectedLessonCount = selectedLessons.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleLesson(): void {
      this.isSubmitting = true;  // Start spinner

      const LessonIds = this.selectedLessonForDeletion.map((Lesson: any) => Lesson.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.LessonService.deleteMultipleLessons(LessonIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchLessons();  // Refresh the Lesson list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedLessonCount} Lesson(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Lessons', 'error');
          }
      );
  }
 

  permitLessonActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  onPopupHidden() {
    this.fetchLessons();
  }

  selectionChanged(data: any): void {
    this.selectedLessons = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Lesson: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Lesson) {
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
        console.warn(`Unsupported toast Lesson: ${Lesson}`);
        break;
    }
  }
}
