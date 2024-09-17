import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Curriculum } from '../curriculum.model'; 
import { CurriculumService } from '../curriculum.service'; 
import { CourseService } from '../../courses/course.services';
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
  selector: 'app-coursecurriculum-info',
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
  templateUrl: './coursecurriculum-info.component.html',
  styleUrl: './coursecurriculum-info.component.css'
})
export class CoursecurriculumInfoComponent implements OnInit {

  curriculum: Curriculum[] = [];
  selectedCurriculum: any[] = [];
  isLoading: boolean = true;

  // courses
  Course: any[] = [];
  Student: any[] = [];

  @ViewChild('multipleCurriculumGrid', { static: false }) multipleCurriculumGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false }) curriculumGrid!: DxDataGridComponent;

  constructor(
    private curriculumService: CurriculumService,
    private courseService: CourseService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchCurriculum();
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

  
  fetchCurriculum(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.curriculumService.getCurriculums().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.curriculum = response.data;
          this.showToast('Curriculum loaded successfully!', 'info');
        } else {
          this.curriculum = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        // console.error('Error fetching curriculum:', error);
        this.showToast('Error fetching curriculum', 'error');
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
    const worksheet = workbook.addWorksheet('Curriculum');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Curriculum.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.curriculum;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Curriculum.csv');
  }

  selectionChanged(e: any): void {
    this.selectedCurriculum = e.selectedRowsData; // Capture selected rows
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
