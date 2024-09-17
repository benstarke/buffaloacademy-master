import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SystemAuditTrail } from '../systemaudittrail.model'; 
import { SystemAuditTrailService } from '../systemaudittrail.service';
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
  selector: 'app-systemaudittrail-info',
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
  templateUrl: './systemaudittrail-info.component.html',
  styleUrl: './systemaudittrail-info.component.css'
})
export class SystemaudittrailInfoComponent implements OnInit {

  systemAuditTrail: SystemAuditTrail[] = [];
  selectedSystemAuditTrail: any[] = [];
  isLoading: boolean = true;

  @ViewChild('multipleSystemAuditTrailGrid', { static: false }) multipleSystemAuditTrailGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) systemAuditTrailGrid!: DxDataGridComponent;

  constructor(
    private systemAuditTrailService: SystemAuditTrailService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchSystemAuditTrail();
  }

  // Master Detail API

  onContentReady(e: DxDataGridTypes.ContentReadyEvent) {
    if (!e.component.getSelectedRowKeys().length) { e.component.selectRowsByIndexes([0]); }
  }

  onSelectionChanged(e: DxDataGridTypes.SelectionChangedEvent) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  // Master Detail API

  fetchSystemAuditTrail(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.systemAuditTrailService.getSystemAuditTrail().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.systemAuditTrail = response.data;
          console.log('Audits loaded successfully!', this.systemAuditTrail);
          this.showToast('Audits loaded successfully!', 'success');
        } else {
          this.systemAuditTrail = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner if there's an error
        this.isLoading = false;
  
        console.error('Error fetching audits:', error);
        this.showToast('Error fetching audits', 'error');
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
    const worksheet = workbook.addWorksheet('Status');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      if (selectedData.length > 0) {
        worksheet.addRows(selectedData.map(row => [row.name, row.description]));
      }
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'SystemAuditTrail.xlsx');
      });
    });
  }

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.systemAuditTrail;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'SystemAuditTrail.csv');
  }

  selectionChanged(e: any): void {
    this.selectedSystemAuditTrail = e.selectedRowsData; // Capture selected rows
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

