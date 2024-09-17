import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Lesson } from '../lesson.model'; 
import { LessonService } from '../lesson.services'; 
import { CurriculumService } from '../../course-curriculum/curriculum.service';
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
  selector: 'app-curriculumlessons-info',
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
  templateUrl: './curriculumlessons-info.component.html',
  styleUrl: './curriculumlessons-info.component.css'
})
export class CurriculumlessonsInfoComponent implements OnInit {

  lessons: Lesson[] = [];
  selectedLessons: any[] = [];
  isLoading: boolean = true;

  
  // course curriculum
  Curriculum: any[] = [];

  @ViewChild('multipleLessonsGrid', { static: false }) multipleLessonsGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false }) lessonsGrid!: DxDataGridComponent;

  constructor(
    private lessonService: LessonService,
    private curriculumService: CurriculumService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchLessons();
    this.fetchCurriculum();
  }

  fetchCurriculum() {
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

    this.lessonService.getLessons().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.lessons = response.data;
          this.showToast('Lessons loaded successfully!', 'info');
        } else {
          this.lessons = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        // console.error('Error fetching lessons:', error);
        this.showToast('Error fetching lessons', 'error');
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
    const worksheet = workbook.addWorksheet('Lessons');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Lessons.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.lessons;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Status.csv');
  }

  selectionChanged(e: any): void {
    this.selectedLessons = e.selectedRowsData; // Capture selected rows
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

