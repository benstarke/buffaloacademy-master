import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Difficulty } from '../difficulty.model'; 
import { DifficultyService } from '../difficulty.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-coursetype-mgmt',
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
  templateUrl: './coursedifficulty-mgmt.component.html',
  styleUrl: './coursedifficulty-mgmt.component.css'
})
export class CoursedifficultyMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addDifficultyForm: FormGroup;
  updateDifficultyForm: FormGroup;
  deleteDifficultyForm: FormGroup;
  difficulties: Difficulty[] = [];
  noDifficultiesMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedDifficulties: Difficulty[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedDifficultiesForDeletion: any[] = [];  
  selectedDifficultiesCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleDifficultyGrid', { static: false }) multipleDifficultyGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) difficultysGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitDifficultyMenuItems = [
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
  permitGeneralDifficultyMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_difficulty', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_difficulty', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_difficulty':
            this.onAddDifficultyClick();
            break;
        case 'delete_difficulty':
            this.onDeleteMultipleDifficultySubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private difficultyService: DifficultyService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addDifficultyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateDifficultyForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteDifficultyForm = new FormGroup({
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
    this.fetchDifficulties();
  }

  fetchDifficulties(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.difficultyService.getDifficulties().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.difficulties = response.data;
          this.noDifficultiesMessage = '';
        } else {
          this.difficulties = [];
          this.noDifficultiesMessage = response.message;
          this.showToast(this.noDifficultiesMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Type === 404 && error.error && error.error.message === 'No course difficulties found!') {
          this.difficulties = [];
          this.noDifficultiesMessage = error.error.message;
          this.showToast(this.noDifficultiesMessage, 'info');
        } else {
          this.noDifficultiesMessage = 'Error fetching course difficulties';
          this.showToast(this.noDifficultiesMessage, 'error');
        }
      }
    );
  }

  onAddDifficultyClick(): void {
    this.addPopupVisible = true;
  }

  onAddDifficultySubmit(addAnother: boolean): void {
    if (this.addDifficultyForm.valid) {
        const newDifficultyName = this.addDifficultyForm.get('name')?.value.trim();

        // Frontend validation for unique Difficulty name
        const difficultyExists = this.difficulties.some(difficulty => difficulty.name.toLowerCase() === newDifficultyName.toLowerCase());
        if (difficultyExists) {
            this.showToast('Course difficulty name already exists', 'error');
            return;
        }

        if (addAnother) {
            this.isSubmittingSaveAndAddAnother = true;  // Start spinner for "Save and Add Another"
        } else {
            this.isSubmittingSave = true;  // Start spinner for "Save"
        }

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmittingSave = false;  // Stop spinner
            this.isSubmittingSaveAndAddAnother = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const formValueWithCreatedBy = {
            ...this.addDifficultyForm.value,
        };

        this.difficultyService.addDifficulty(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchDifficulties(); // Refresh the Difficulty list
                    if (addAnother) {
                        this.addDifficultyForm.reset(); // Clear the form for the next entry
                        this.showToast('Course difficulty added successfully. You can add another.', 'success');
                    } else {
                        this.addDifficultyForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Course difficulty added successfully', 'success');
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
                    this.showToast('Course difficulty already exists', 'error');
                } else {
                    this.showToast('Error adding course difficulty', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addDifficultyForm.controls).forEach(key => {
            const control = this.addDifficultyForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  onPopupHidden() {
    this.fetchDifficulties();
  }

  funcEditDetails(data: any) {
    this.updateDifficultyForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateDifficultySubmit(): void {
    if (this.updateDifficultyForm.valid) {
        const updatedDifficultyName = this.updateDifficultyForm.get('name')?.value.trim();
        const currentDifficultyId = this.updateDifficultyForm.get('id')?.value;

        // Frontend validation for unique Difficulty name (excluding the current Difficulty being edited)
        const difficultyExists = this.difficulties.some(difficulty => 
            difficulty.name.toLowerCase() === updatedDifficultyName.toLowerCase() && 
            difficulty.id !== currentDifficultyId
        );

        if (difficultyExists) {
            this.showToast('Course difficulty name already exists in another record', 'error');
            return;
        }

        this.isSubmitting = true;  // Start spinner

        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('Please log in again.', 'error');
            this.isSubmitting = false;  // Stop spinner
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const updatedType = {
            ...this.updateDifficultyForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.difficultyService.updateDifficulty(updatedType, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchDifficulties(); // Refresh the tag list
                this.updateDifficultyForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Course difficulty updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course difficulty', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateDifficultyForm.controls).forEach(key => {
            const control = this.updateDifficultyForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  funcDeleteDetails(data:any) {
    this.deleteDifficultyForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteDifficultySubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteDifficultyForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.difficultyService.deleteDifficulty(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchDifficulties(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Course difficulty deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course difficulty', 'error');
        }
    );
  }


  onDeleteMultipleDifficultySubmit(): void {
    const selectedDifficulties = this.multipleDifficultyGrid.instance.getSelectedRowsData();
    if (selectedDifficulties.length === 0) {
        this.showToast('No course Difficulties selected.', 'error');
        return;
    }

    // Store the selected Difficulty for deletion and their count
    this.selectedDifficultiesForDeletion = selectedDifficulties;
    this.selectedDifficultiesCount = selectedDifficulties.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleDifficulty(): void {
      this.isSubmitting = true;  // Start spinner

      const difficultyIds = this.selectedDifficultiesForDeletion.map((difficulty: any) => difficulty.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.difficultyService.deleteMultipleDifficulties(difficultyIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchDifficulties();  // Refresh the type list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedDifficultiesCount} Course difficulties deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting course difficulties', 'error');
          }
      );
  }
 

  permitDifficultyActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedDifficulties = data.selectedRowsData;
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
