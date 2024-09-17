import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Enrollment } from '../enrollment.model';
import { EnrollmentService } from '../enrollment.service'; 
import { CourseService } from '../../courses/course.services';
import { StudentService } from '../../../../student/dashboard/student.services'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxMenuModule, DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxDataGridComponent, DxTextBoxModule, DxTextAreaModule } from 'devextreme-angular';

// Import libraries for excel export
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { unparse } from 'papaparse';


@Component({
  selector: 'app-courseenrollment-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxMenuModule,
    DxTextBoxModule, DxTextAreaModule
  ],
  templateUrl: './courseenrollment-info.component.html',
  styleUrl: './courseenrollment-info.component.css'
})
export class CourseenrollmentInfoComponent implements OnInit {

  enrollment: Enrollment[] = [];
  selectedEnrollment: any[] = [];
  isLoading: boolean = true;

  // courses
  Course: any[] = [];
  Student: any[] = [];

  @ViewChild('multipleEnrollmentGrid', { static: false }) multipleEnrollmentGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false }) enrollmentGrid!: DxDataGridComponent;

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private studentService: StudentService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchEnrollment();
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

  fetchEnrollment(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.enrollmentService.getEnrollments().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.enrollment = response.data;
          this.showToast('Enrollment loaded successfully!', 'info');
        } else {
          this.enrollment = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        // console.error('Error fetching enrollment:', error);
        this.showToast('Error fetching enrollment', 'error');
      }
    );
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {
    const selectedData = e.component.getSelectedRowsData();
    switch (e.format) {
      case 'xlsx':
        this.exportToExcel(e, selectedData);
        break;
      case 'csv':
        this.exportToCSV(selectedData);
        break;
      default:
        break;
    }
    e.cancel = true; // Prevent default export
  }

  exportToExcel(e: DxDataGridTypes.ExportingEvent, selectedData: any[]) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Enrollment');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Enrollment.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.enrollment;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Status.csv');
  }

  selectionChanged(e: any): void {
    this.selectedEnrollment = e.selectedRowsData; // Capture selected rows
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
    }
  }
}
