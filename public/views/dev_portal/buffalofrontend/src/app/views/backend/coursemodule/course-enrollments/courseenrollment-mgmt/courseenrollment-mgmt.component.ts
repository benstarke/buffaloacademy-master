import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Enrollment } from '../enrollment.model'; 
import { EnrollmentService } from '../enrollment.service';
import { CourseService } from '../../courses/course.services';
import { StudentService } from '../../../../student/dashboard/student.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule, DxSelectBoxModule, DxDateBoxModule,} from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-courseEnrollment-mgmt',
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
    DxDateBoxModule,
  ],
  templateUrl: './courseenrollment-mgmt.component.html',
  styleUrl: './courseenrollment-mgmt.component.css'
})
export class CourseenrollmentMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addEnrollmentForm: FormGroup;
  updateEnrollmentForm: FormGroup;
  deleteEnrollmentForm: FormGroup;
  Enrollments: Enrollment[] = [];
  noEnrollmentsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedEnrollments: Enrollment[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // courses
  Course: any[] = [];
  Student: any[] = [];

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedEnrollmentForDeletion: any[] = [];  
  selectedEnrollmentCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleEnrollmentGrid', { static: false }) multipleEnrollmentGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) EnrollmentsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitEnrollmentMenuItems = [
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
  permitGeneralEnrollmentMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Enrollment', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Enrollment', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Enrollment':
            this.onAddEnrollmentClick();
            break;
        case 'delete_Enrollment':
            this.onDeleteMultipleEnrollmentSubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private EnrollmentService: EnrollmentService, 
    public toastr: ToastrService,
    private courseService: CourseService,
    private studentService: StudentService,
    private http: HttpClient, ) {
    this.addEnrollmentForm = new FormGroup({
      course_id: new FormControl('', Validators.required),
      student_id: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });

    this.updateEnrollmentForm = new FormGroup({
      id: new FormControl('', Validators.required),
      course_id: new FormControl('', Validators.required),
      student_id: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });

    this.deleteEnrollmentForm = new FormGroup({
      id: new FormControl('', Validators.required),
      course_id: new FormControl('', Validators.required),
      student_id: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
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
    this.fetchEnrollments();
    this.fetchCourses();
    this.fetchStudents();
  }

  fetchCourses() {
    this.courseService.getCourses().subscribe(
      (response: any) => {
        console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Course = response.data; // Assign the 'data' array to the Course property
          console.log('Courses fetched successfully:', this.Course); // Log the fetched Courses
        } else {
          console.warn('Courses fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Courses:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(
      (response: any) => {
        console.log('Full API Response:', response); // Log the full response for debugging
  
        // Check if the response is successful
        if (response.success) {
          this.Student = response.data; // Assign the 'data' array to the Student property
          console.log('Students fetched successfully:', this.Student); // Log the fetched Students
        } else {
          console.warn('Students fetch was not successful:', response.message); // Handle unsuccessful responses
        }
      },
      (error: any) => {
        console.error('Error fetching Students:', error); // Handle API error
        // Optionally, show a message to the user
      }
    );
  }

  
  fetchEnrollments(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.EnrollmentService.getEnrollments().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Enrollments = response.data;
          this.noEnrollmentsMessage = '';
        } else {
          this.Enrollments = [];
          this.noEnrollmentsMessage = response.message;
          this.showToast(this.noEnrollmentsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Enrollment === 404 && error.error && error.error.message === 'No Enrollments found!') {
          this.Enrollments = [];
          this.noEnrollmentsMessage = error.error.message;
          this.showToast(this.noEnrollmentsMessage, 'info');
        } else {
          this.noEnrollmentsMessage = 'Error fetching Enrollments';
          this.showToast(this.noEnrollmentsMessage, 'error');
        }
      }
    );
  }

  onAddEnrollmentClick(): void {
    this.addPopupVisible = true;
  }

  onAddEnrollmentSubmit(addAnother: boolean): void {
    if (this.addEnrollmentForm.valid) {
        const studentId = this.addEnrollmentForm.get('student_id')?.value;
        const courseId = this.addEnrollmentForm.get('course_id')?.value;

        // Frontend validation for unique student_id and course_id combination
        const EnrollmentExists = this.Enrollments.some(enrollment => 
            enrollment.student_id === studentId && enrollment.course_id === courseId
        );

        if (EnrollmentExists) {
            this.showToast('Enrollment with this student and course already exists', 'error');
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
            ...this.addEnrollmentForm.value,
        };

        this.EnrollmentService.addEnrollment(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchEnrollments(); // Refresh the Enrollment list
                    if (addAnother) {
                        this.addEnrollmentForm.reset(); // Clear the form for the next entry
                        this.showToast('Enrollment added successfully. You can add another.', 'success');
                    } else {
                        this.addEnrollmentForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Enrollment added successfully', 'success');
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
                    this.showToast('Enrollment already exists', 'error');
                } else {
                    this.showToast('Error adding Enrollment', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addEnrollmentForm.controls).forEach(key => {
            const control = this.addEnrollmentForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
}


  onPopupHidden() {
    this.fetchEnrollments();
  }

  funcEditDetails(data: any) {
    this.updateEnrollmentForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateEnrollmentSubmit(): void {
    if (this.updateEnrollmentForm.valid) {
        const updatedStudentId = this.updateEnrollmentForm.get('student_id')?.value;
        const updatedCourseId = this.updateEnrollmentForm.get('course_id')?.value;
        const currentEnrollmentId = this.updateEnrollmentForm.get('id')?.value;

        // Frontend validation for unique student_id and course_id combination (excluding the current Enrollment being edited)
        const EnrollmentExists = this.Enrollments.some(enrollment => 
            enrollment.student_id === updatedStudentId && 
            enrollment.course_id === updatedCourseId && 
            enrollment.id !== currentEnrollmentId
        );

        if (EnrollmentExists) {
            this.showToast('This student is already enrolled in this course', 'error');
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
        const updatedEnrollment = {
            ...this.updateEnrollmentForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.EnrollmentService.updateEnrollment(updatedEnrollment, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchEnrollments(); // Refresh the Enrollment list
                this.updateEnrollmentForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Course Enrollment updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course Enrollment', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateEnrollmentForm.controls).forEach(key => {
            const control = this.updateEnrollmentForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
}


  funcDeleteDetails(data:any) {
    this.deleteEnrollmentForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteEnrollmentSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteEnrollmentForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.EnrollmentService.deleteEnrollment(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchEnrollments(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Enrollment deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Enrollment', 'error');
        }
    );
  }


  onDeleteMultipleEnrollmentSubmit(): void {
    const selectedEnrollments = this.multipleEnrollmentGrid.instance.getSelectedRowsData();
    if (selectedEnrollments.length === 0) {
        this.showToast('No course Enrollments selected.', 'error');
        return;
    }

    // Store the selected Enrollments for deletion and their count
    this.selectedEnrollmentForDeletion = selectedEnrollments;
    this.selectedEnrollmentCount = selectedEnrollments.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleEnrollment(): void {
      this.isSubmitting = true;  // Start spinner

      const EnrollmentIds = this.selectedEnrollmentForDeletion.map((Enrollment: any) => Enrollment.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.EnrollmentService.deleteMultipleEnrollments(EnrollmentIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchEnrollments();  // Refresh the Enrollment list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedEnrollmentCount} Enrollment(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Enrollments', 'error');
          }
      );
  }
 

  permitEnrollmentActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedEnrollments = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Enrollment: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Enrollment) {
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
        console.warn(`Unsupported toast Enrollment: ${Enrollment}`);
        break;
    }
  }
}

