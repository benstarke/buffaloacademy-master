import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Tag } from '../tag.model';
import { TagService } from '../tag.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxMenuModule, DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxDataGridComponent, DxTextBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';

@Component({
  selector: 'app-taginfo',
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
  templateUrl: './taginfo.component.html',
  styleUrls: ['./taginfo.component.css'],
})
export class TaginfoComponent implements OnInit {

  tags: Tag[] = [];
  selectedTags: Tag[] = [];

  @ViewChild(DxDataGridComponent, { static: false }) tagsGrid!: DxDataGridComponent;

  constructor(
    private tagService: TagService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags(): void {
    this.tagService.getTags().subscribe(
      (response: any) => {
        if (response.success) {
          this.tags = response.data;
          this.showToast('Tags loaded successfully!', 'success');
        } else {
          this.tags = [];
          this.showToast(response.message, 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching tags:', error);
        this.showToast('Error fetching tags', 'error');
      }
    );
  }

  selectionChanged(data: any): void {
    this.selectedTags = data.selectedRowsData;
  }

  onExportSelected(event: any): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Tags');

    const exportOptions = {
      component: this.tagsGrid.instance,
      worksheet: worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: this.selectedTags.length > 0 // Export only selected rows if any are selected
    };

    exportDataGrid(exportOptions).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer]), 'Tags.xlsx');
      }).catch((error) => {
        console.error('Error writing buffer:', error);
        this.showToast('Error exporting data', 'error');
      });
    }).catch((error) => {
      console.error('Error exporting:', error);
      this.showToast('Error exporting data', 'error');
    });

    event.cancel = true; // Prevent default export
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
