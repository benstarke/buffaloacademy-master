import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Permission } from '../permission.model';
import { PermissionService } from '../permission.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    TableModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    TooltipModule
  ],
  templateUrl: './permission-info.component.html',
  styleUrls: ['./permission-info.component.css'],
})
export class PermissionInfoComponent implements OnInit {

  permissions: Permission[] = [];
  selectedPermissions: Permission[] = [];
  cols: any[] = [];
  exportColumns: any[] = [];

  first = 0;
  rowsPerPageOptions: number[] = [10, 25, 50]; // Direct initialization
  rows = 10;

  constructor(
    private permissionService: PermissionService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchPermissions();
    this.cols = [
      // { field: 'id', header: 'ID' },
      { field: 'name', header: 'Permission' },
      { field: 'identity', header: 'Identity' },
      { field: 'author', header: 'Created By' },
      { field: 'duration', header: 'Time Posted' }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.permissions ? this.first === (this.permissions.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.permissions ? this.first === 0 : true;
}

  fetchPermissions(): void {
    this.permissionService.getPermissions().subscribe(
      (response: any) => {
        if (response.success) {
          this.permissions = response.data;
          this.showToast('Permissions loaded successfully!', 'success');
        } else {
          this.permissions = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
        this.showToast('Error fetching permissions', 'error');
      }
    );
  }


  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.permissions);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'permissions');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
