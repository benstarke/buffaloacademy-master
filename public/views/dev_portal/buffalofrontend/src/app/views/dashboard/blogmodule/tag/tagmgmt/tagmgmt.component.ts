import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tag } from '../tag.model';
import { TagService } from '../tag.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';

@Component({    
  selector: 'app-tagmgmt',
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
    DxMenuModule
  ],
  templateUrl: './tagmgmt.component.html',
  styleUrls: ['./tagmgmt.component.css']
})
export class TagmgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addTagForm: FormGroup;
  updateTagForm: FormGroup;
  deleteTagForm: FormGroup;
  tags: Tag[] = [];
  noTagsMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedTags: Tag[] = [];

  permitTagMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  @ViewChild(DxDataGridComponent, { static: false }) tagsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  constructor(private tagService: TagService, public toastr: ToastrService) {
    this.addTagForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateTagForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteTagForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags(): void {
    this.tagService.getTags().subscribe(
      (response: any) => {
        if (response.success) {
          this.tags = response.data;
          this.noTagsMessage = '';
          this.showToast('Tags loaded successfully!', 'success');
        } else {
          this.tags = [];
          this.noTagsMessage = response.message;
          this.showToast(this.noTagsMessage, 'info');
        }
      },
      (error: any) => {
        if (error.status === 404 && error.error && error.error.message === 'No tags found!') {
          this.tags = [];
          this.noTagsMessage = error.error.message;
          this.showToast(this.noTagsMessage, 'info');
        } else {
          console.error('Error fetching tags:', error);
          this.noTagsMessage = 'Error fetching tags';
          this.showToast(this.noTagsMessage, 'error');
        }
      }
    );
  }

  onAddTagClick(): void {
    this.addPopupVisible = true;
  }

  onAddTagSubmit(): void {
    if (this.addTagForm.valid) {
      const formValueWithCreatedBy = {
        ...this.addTagForm.value,
        created_by: localStorage.getItem('first_name') || 'Unknown'
      };
  
      this.tagService.addTag(formValueWithCreatedBy).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Tag added successfully:', response);
            this.fetchTags(); // Refresh the tag list
            this.addTagForm.reset(); // Clear the form after adding
            this.addPopupVisible = false; // Close the add popup
            this.toastr.success('Tag added successfully');
          } else {
            console.error('Error adding tag:', response.message);
            this.toastr.error(response.message);
          }
        },
        (error: any) => {
          console.error('Error adding tag:', error);
          if (error.status === 422 && error.error.errors) {
            this.toastr.error('Tag already exists');
          } else {
            this.toastr.error('Error adding tag');
          }
        }
      );
    } else {
      // Form is invalid, display a toast message for each invalid field
      Object.keys(this.addTagForm.controls).forEach(key => {
        if (this.addTagForm.controls[key].invalid) {
          this.toastr.error(`${key} is required or invalid`);
        }
      });
    }
  }
  

  onPopupHidden() {
    this.fetchTags();
  }

  
  funcEditDetails(data:any) {
    this.updateTagForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }
  
  onUpdateTagSubmit(): void {
    if (this.updateTagForm.valid) {
      const updatedTag: Tag = this.updateTagForm.value;
      this.tagService.updateTag(updatedTag).subscribe(
        (response) => {
          console.log('Tag updated successfully:', response);
          this.fetchTags(); // Refresh the tag list
          this.updateTagForm.reset(); // Clear the form after update
          this.updatePopupVisible = false; // Close the update popup
          this.toastr.success('Tag updated successfully');
        },
        (error) => {
          console.error('Error updating tag:', error);
          this.toastr.error('Error updating tag');
        }
      );
    }
  }
  
  


  funcDeleteDetails(data:any) {
    this.deleteTagForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteTagSubmit(): void {
    const tagId = this.deleteTagForm.value.id;
  
    this.tagService.deleteTag(tagId).subscribe(
      (response) => {
        console.log('Tag deleted successfully:', response);
        this.fetchTags(); // Refresh the tag list after deletion
        this.deletePopupVisible = false; // Close the delete popup
        this.toastr.success('Tag deleted successfully');
      },
      (error) => {
        console.error('Error deleting tag:', error);
        this.toastr.error('Error deleting tag');
      }
    );
  }
  
  
  // permitTagActionColClick(event: any, data: any): void {
  //   const action = event.itemData.action;
  //   if (action === 'edit') {
  //     this.funcEditDetails(data);
  //   } else if (action === 'delete') {
  //     this.funcDeleteDetails(data);
  //   }
  // }

  permitTagActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedTags = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
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
        this.toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-top-right' });
        break;
      default:
        console.warn(`Unsupported toast type: ${type}`);
        break;
    }
  }
}
