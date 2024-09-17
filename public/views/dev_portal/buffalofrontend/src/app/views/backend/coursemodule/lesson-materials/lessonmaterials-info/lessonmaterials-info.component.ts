import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../material.model'; 
import { MaterialService } from '../material.services'; 
import { LessonService } from '../../curriculum-lessons/lesson.services';
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
  selector: 'app-lessonmaterials-info',
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
  templateUrl: './lessonmaterials-info.component.html',
  styleUrl: './lessonmaterials-info.component.css'
})
export class LessonmaterialsInfoComponent implements OnInit {

  materials: Material[] = [];
  selectedMaterials: any[] = [];
  isLoading: boolean = true;

  // lessons
  Lesson: any[] = [];

  @ViewChild('multipleMaterialsGrid', { static: false }) multipleMaterialsGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false }) materialsGrid!: DxDataGridComponent;

  constructor(
    private materialService: MaterialService,
    private lessonService: LessonService,
    public toastr: ToastrService) { }

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
    this.isLoading = true;
    console.log('Fetching materials...');
  
    this.materialService.getMaterials().subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Full API Response:', response);
  
        // Check if 'data' exists directly in the response
        if (response && response.data && response.data.length > 0) {
          this.materials = response.data.map((material: any) => ({
            ...material,
            content: material.content_url || material.content
          }));
          console.log('Mapped materials:', this.materials);
          this.showToast('Materials loaded successfully!', 'info');
        } else {
          this.materials = [];
          this.showToast('No materials found', 'info');
          console.log('No materials found');
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.showToast('Error fetching materials', 'error');
        console.error('Error fetching materials:', error);
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
    const worksheet = workbook.addWorksheet('Tags');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tags.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.materials;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Material.csv');
  }

  selectionChanged(e: any): void {
    this.selectedMaterials = e.selectedRowsData; // Capture selected rows
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
