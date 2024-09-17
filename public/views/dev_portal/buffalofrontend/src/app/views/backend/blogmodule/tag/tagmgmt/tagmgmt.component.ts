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
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';



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

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedTagForDeletion: any[] = [];  
  selectedTagCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleTagGrid', { static: false }) multipleTagGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) tagsGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

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

  // Define the menu items for the action menu
  permitGeneralTagMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_tag', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_tag', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_tag':
            this.onAddTagClick();
            break;
        case 'delete_tag':
            this.onDeleteMultipleTagSubmit();
            break;
        default:
            break;
    }
  }


  constructor(
    private tagService: TagService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
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
  
     // Mapping for user-friendly field names
     this.fieldNames = {
      name: 'Name',
      description: 'Description',
      };
  }

  // Field name mapping object
  private fieldNames: { [key: string]: string };

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.tagService.getTags().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.tags = response.data;
          this.noTagsMessage = '';
          // this.showToast('Tags loaded successfully!', 'success');
        } else {
          this.tags = [];
          this.noTagsMessage = response.message;
          this.showToast(this.noTagsMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Tag === 404 && error.error && error.error.message === 'No tags found!') {
          this.tags = [];
          this.noTagsMessage = error.error.message;
          this.showToast(this.noTagsMessage, 'info');
        } else {
          // console.error('Error fetching tags:', error);
          this.noTagsMessage = 'Error fetching tags';
          this.showToast(this.noTagsMessage, 'error');
        }
      }
    );
  }

  onAddTagClick(): void {
    this.addPopupVisible = true;
  }

  onAddTagSubmit(addAnother: boolean): void {
    if (this.addTagForm.valid) {
        const newTagName = this.addTagForm.get('name')?.value.trim();

        // Frontend validation for unique tag name
        const tagExists = this.tags.some(tag => tag.name.toLowerCase() === newTagName.toLowerCase());
        if (tagExists) {
            this.showToast('Tag name already exists', 'error');
            return;
        }

        if (addAnother) {
            this.isSubmittingSaveAndAddAnother = true;  // Start spinner for "Save and Add Another"
        } else {
            this.isSubmittingSave = true;  // Start spinner for "Save"
        }

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('No token found. Please log in again.', 'error');
            this.isSubmittingSave = false;  // Stop spinner
            this.isSubmittingSaveAndAddAnother = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formValueWithCreatedBy = {
            ...this.addTagForm.value,
        };

        this.tagService.addTag(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchTags(); // Refresh the tag list
                    if (addAnother) {
                        this.addTagForm.reset(); // Clear the form for the next entry
                        this.showToast('Tag added successfully. You can add another.', 'success');
                    } else {
                        this.addTagForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Tag added successfully', 'success');
                    }
                } else {
                    this.showToast(response.message, 'error');
                }
            },
            (error: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (error.status === 422 && error.error.errors) {
                    this.showToast('Tag already exists', 'error');
                } else {
                    this.showToast('Error adding tag', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addTagForm.controls).forEach(key => {
            const control = this.addTagForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
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
        const updatedTagName = this.updateTagForm.get('name')?.value.trim();
        const currentTagId = this.updateTagForm.get('id')?.value;

        // Frontend validation for unique tag name (excluding the current tag being edited)
        const tagExists = this.tags.some(tag => 
            tag.name.toLowerCase() === updatedTagName.toLowerCase() && 
            tag.id !== currentTagId
        );

        if (tagExists) {
            this.showToast('Tag name already exists in another record', 'error');
            return;
        }

        this.isSubmitting = true;  // Start spinner

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('No token found. Please log in again.', 'error');
            this.isSubmitting = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const updatedTag = {
            ...this.updateTagForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.tagService.updateTag(updatedTag, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchTags(); // Refresh the tag list
                this.updateTagForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Tag updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating tag', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateTagForm.controls).forEach(key => {
            const control = this.updateTagForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }


  funcDeleteDetails(data:any) {
    this.deleteTagForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteTagSubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteTagForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.tagService.deleteTag(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchTags(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Tag deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting tag', 'error');
        }
    );
  }

  onDeleteMultipleTagSubmit(): void {
    const selectedTags = this.multipleTagGrid.instance.getSelectedRowsData();
    if (selectedTags.length === 0) {
        this.showToast('No tags selected.', 'error');
        return;
    }

    // Store the selected tags for deletion and their count
    this.selectedTagForDeletion = selectedTags;
    this.selectedTagCount = selectedTags.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleTag(): void {
    this.isSubmitting = true;  // Start spinner

    const tagIds = this.selectedTagForDeletion.map((tag: any) => tag.id);
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('No token found. Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.tagService.deleteMultipleTags(tagIds, headers).subscribe(
        () => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchTags();  // Refresh the tag list after deletion
            this.deleteMultiplePopupVisible = false;  // Close the delete popup
            this.showToast(`${this.selectedTagCount} Tag(s) deleted successfully`, 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting tags', 'error');
        }
    );
  }




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
        this.toastr.warning(message, 'Warning', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        break;
      default:
        console.warn(`Unsupported toast type: ${type}`);
        break;
    }
  }
}
