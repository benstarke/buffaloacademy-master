import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';

import { ToastrService } from 'ngx-toastr';
import { Category } from '../category.model'; 
import { CategoryService } from '../category.service'; 
import { ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';


// Import libraries for excel export
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';


// Import libraries for PDF and CSV export
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { parse } from 'papaparse';
import { unparse } from 'papaparse';

// Create a local copy of pdfMake with extended vfs
const pdfMakeWithFonts = { ...pdfMake, vfs: pdfFonts.pdfMake.vfs };



@Component({
  selector: 'app-categoryinfo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
  ],
  templateUrl: './categoryinfo.component.html',
  styleUrl: './categoryinfo.component.css'
})
export class CategoryinfoComponent implements OnInit {

  categories: Category[] = [];
  selectedCategories: any[] = [];
  noCategoriesMessage = '';
  isLoading: boolean = true;

  @ViewChild('multipleCategoriesGrid', { static: false }) multipleCategoriesGrid!: DxDataGridComponent;

  constructor(private categoryService: CategoryService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;
  
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;
  
        if (response.success) {
          this.categories = response.data;
          this.noCategoriesMessage = '';
          this.showToast('Categories loaded successfully!', 'success');
        } else {
          this.categories = [];
          this.noCategoriesMessage = response.message;
          this.showToast(this.noCategoriesMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner if there's an error
        this.isLoading = false;
  
        // console.error('Error fetching categories:', error);
        this.noCategoriesMessage = 'Error fetching categories';
        this.showToast(this.noCategoriesMessage, 'error');
      }
    );
  }
  

  onExporting(e: DxDataGridTypes.ExportingEvent) {
    const selectedData = e.component.getSelectedRowsData();
    switch (e.format) {
      case 'xlsx':
        this.exportToExcel(e, selectedData);
        break;
      case 'pdf':
        this.exportToPDF(e.component, selectedData);
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
    const worksheet = workbook.addWorksheet('Categories');
  
    // Export only the selected data or full data if no selection
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedData.length > 0, // Export only selected rows
    }).then(() => {
      // Write the workbook buffer and save it
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Categories.xlsx');
      });
    });
  }  

  exportToCSV(selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.categories;
    const csvData = unparse(dataToExport.map(cat => ({ name: cat.name, description: cat.description })));
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'Categories.csv');
  }

  exportToPDF(component: any, selectedData: any[]) {
    const dataToExport = selectedData.length > 0 ? selectedData : this.categories;

    const documentDefinition = {
      content: [
        { text: 'Categories', style: 'header' },
        {
          table: {
            body: [
              ['Name', 'Description'],
              ...dataToExport.map(cat => [cat.name, cat.description])
            ]
          }
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).download('Categories.pdf');
}
  
  

  selectionChanged(e: any): void {
    this.selectedCategories = e.selectedRowsData; // Capture selected rows
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
      default:
        console.warn(`Unsupported toast type: ${type}`);
        break;
    }
  }


}
