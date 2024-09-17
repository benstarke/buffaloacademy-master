import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Difficulty } from '../difficulty.model'; 
import { DifficultyService } from '../difficulty.service'; 
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
  selector: 'app-coursedifficulty-info',
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
  templateUrl: './coursedifficulty-info.component.html',
  styleUrl: './coursedifficulty-info.component.css'
})
export class CoursedifficultyInfoComponent implements OnInit {

  difficulty: Difficulty[] = [];
  selectedDifficulty: any[] = [];
  isLoading: boolean = true;

  @ViewChild('multipleDifficultyGrid', { static: false }) multipleDifficultyGrid!: DxDataGridComponent;

  @ViewChild(DxDataGridComponent, { static: false }) difficultyGrid!: DxDataGridComponent;

  constructor(
    private difficultyService: DifficultyService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchDifficulty();
  }

  fetchDifficulty(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.difficultyService.getDifficulties().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.difficulty = response.data;
          this.showToast('Difficulty loaded successfully!', 'info');
        } else {
          this.difficulty = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        // console.error('Error fetching difficulty:', error);
        this.showToast('Error fetching difficulty', 'error');
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
    const worksheet = workbook.addWorksheet('Difficulty');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Difficulty.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.difficulty;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Status.csv');
  }

  selectionChanged(e: any): void {
    this.selectedDifficulty = e.selectedRowsData; // Capture selected rows
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
