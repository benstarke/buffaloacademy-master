import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Currency } from '../currencies.model';
import { CurrencyService } from '../currencies.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-app-currencies-mgmt',
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
  templateUrl: './app-currencies-mgmt.component.html',
  styleUrl: './app-currencies-mgmt.component.css'
})
export class AppCurrenciesMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addCurrencyForm: FormGroup;
  updateCurrencyForm: FormGroup;
  deleteCurrencyForm: FormGroup;
  Currencies: Currency[] = [];
  noCurrencysMessage = '';
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  selectedCurrencys: Currency[] = [];

  isLoading: boolean = true;
  isSubmitting = false;
  isSubmittingSave = false;  // For the "Save" button
  isSubmittingSaveAndAddAnother = false;  // For the "Save and Add Another" button

  // delete multiple records
  deleteMultiplePopupVisible = false; // Control the visibility of the delete popup
  selectedCurrencyForDeletion: any[] = [];  
  selectedCurrencyCount: number = 0;  // Holds the count of selected categories for deletion

  @ViewChild('multipleCurrencyGrid', { static: false }) multipleCurrencyGrid!: DxDataGridComponent;
  @ViewChild(DxDataGridComponent, { static: false }) CurrencysGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  permitCurrencyMenuItems = [
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
  permitGeneralCurrencyMenuItems = [
    {
        text: "Menu",
        icon: 'fa fa-bars', // Using a Font Awesome icon for the menu
        items: [
            { text: "Add", action: 'add_Currency', icon: 'fa fa-plus' },
            { text: "Delete", action: 'delete_Currency', icon: 'fa fa-trash', cssClass: 'red-text' }
        ]
    }
  ];

  onMenuItemClick(event: any): void {
    const action = event.itemData.action;
  
    switch (action) {
        case 'add_Currency':
            this.onAddCurrencyClick();
            break;
        case 'delete_Currency':
            this.onDeleteMultipleCurrencySubmit();
            break;
        default:
            break;
    }
  }

  constructor(
    private CurrencyService: CurrencyService, 
    public toastr: ToastrService,
    private http: HttpClient, ) {
    this.addCurrencyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateCurrencyForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteCurrencyForm = new FormGroup({
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
    this.fetchCurrencys();
  }

  fetchCurrencys(): void {
    // Set the spinner to be visible when the method starts
    this.isLoading = true;

    this.CurrencyService.getCurrencies().subscribe(
      (response: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (response.success) {
          this.Currencies = response.data;
          this.noCurrencysMessage = '';
        } else {
          this.Currencies = [];
          this.noCurrencysMessage = response.message;
          this.showToast(this.noCurrencysMessage, 'info');
        }
      },
      (error: any) => {
        // Hide the spinner when the API call is complete
        this.isLoading = false;

        if (error.Currency === 404 && error.error && error.error.message === 'No Currencys found!') {
          this.Currencies = [];
          this.noCurrencysMessage = error.error.message;
          this.showToast(this.noCurrencysMessage, 'info');
        } else {
          this.noCurrencysMessage = 'Error fetching Currencys';
          this.showToast(this.noCurrencysMessage, 'error');
        }
      }
    );
  }

  onAddCurrencyClick(): void {
    this.addPopupVisible = true;
  }

  onAddCurrencySubmit(addAnother: boolean): void {
    if (this.addCurrencyForm.valid) {
        const newCurrencyName = this.addCurrencyForm.get('name')?.value.trim();

        // Frontend validation for unique Currency name
        const CurrencyExists = this.Currencies.some(Currency => Currency.name.toLowerCase() === newCurrencyName.toLowerCase());
        if (CurrencyExists) {
            this.showToast('Currency name already exists', 'error');
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
            ...this.addCurrencyForm.value,
        };

        this.CurrencyService.addCurrency(formValueWithCreatedBy, headers).subscribe(
            (response: any) => {
                if (addAnother) {
                    this.isSubmittingSaveAndAddAnother = false;  // Stop spinner for "Save and Add Another"
                } else {
                    this.isSubmittingSave = false;  // Stop spinner for "Save"
                }

                if (response.success) {
                    this.fetchCurrencys(); // Refresh the Currency list
                    if (addAnother) {
                        this.addCurrencyForm.reset(); // Clear the form for the next entry
                        this.showToast('Currency added successfully. You can add another.', 'success');
                    } else {
                        this.addCurrencyForm.reset(); // Clear the form after submitting
                        this.addPopupVisible = false; // Close the add popup
                        this.showToast('Currency added successfully', 'success');
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
                    this.showToast('Currency already exists', 'error');
                } else {
                    this.showToast('Error adding Currency', 'error');
                }
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.addCurrencyForm.controls).forEach(key => {
            const control = this.addCurrencyForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  onPopupHidden() {
    this.fetchCurrencys();
  }

  funcEditDetails(data: any) {
    this.updateCurrencyForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  onUpdateCurrencySubmit(): void {
    if (this.updateCurrencyForm.valid) {
        const updatedCurrencyName = this.updateCurrencyForm.get('name')?.value.trim();
        const currentCurrencyId = this.updateCurrencyForm.get('id')?.value;

        // Frontend validation for unique Currency name (excluding the current Currency being edited)
        const CurrencyExists = this.Currencies.some(Currency => 
            Currency.name.toLowerCase() === updatedCurrencyName.toLowerCase() && 
            Currency.id !== currentCurrencyId
        );

        if (CurrencyExists) {
            this.showToast('Course Currency name already exists in another record', 'error');
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
        const updatedCurrency = {
            ...this.updateCurrencyForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.CurrencyService.updateCurrency(updatedCurrency, headers).subscribe(
            (response) => {
                this.isSubmitting = false;  // Stop spinner
                this.fetchCurrencys(); // Refresh the tag list
                this.updateCurrencyForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Course Currency updated successfully', 'info');
            },
            (error) => {
                this.isSubmitting = false;  // Stop spinner
                this.showToast('Error updating course Currency', 'error');
            }
        );
    } else {
        // Show toast messages only for fields that are invalid
        Object.keys(this.updateCurrencyForm.controls).forEach(key => {
            const control = this.updateCurrencyForm.get(key);
            if (control && control.invalid && (control.value === null || control.value === '')) {
                const fieldName = this.fieldNames[key] || key; // Fallback to control name if mapping is not defined
                this.showToast(`${fieldName} field is required`, 'error');
            }
        });
    }
  }

  funcDeleteDetails(data:any) {
    this.deleteCurrencyForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }
  
  
  onDeleteCurrencySubmit(): void {
    this.isSubmitting = true;  // Start spinner
    const tagId = this.deleteCurrencyForm.value.id;
    
    const token = localStorage.getItem('token');
    if (!token) {
        this.showToast('Please log in again.', 'error');
        this.isSubmitting = false;  // Stop spinner
        return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.CurrencyService.deleteCurrency(tagId, headers).subscribe(
        (response) => {
            this.isSubmitting = false;  // Stop spinner
            this.fetchCurrencys(); // Refresh the tag list after deletion
            this.deletePopupVisible = false; // Close the delete popup
            this.showToast('Currency deleted successfully', 'warning');
        },
        (error) => {
            this.isSubmitting = false;  // Stop spinner
            this.showToast('Error deleting course Currency', 'error');
        }
    );
  }


  onDeleteMultipleCurrencySubmit(): void {
    const selectedCurrencys = this.multipleCurrencyGrid.instance.getSelectedRowsData();
    if (selectedCurrencys.length === 0) {
        this.showToast('No course Currencys selected.', 'error');
        return;
    }

    // Store the selected Currencys for deletion and their count
    this.selectedCurrencyForDeletion = selectedCurrencys;
    this.selectedCurrencyCount = selectedCurrencys.length;
    this.deleteMultiplePopupVisible = true;  // Show the confirmation popup
  }

  confirmDeleteMultipleCurrency(): void {
      this.isSubmitting = true;  // Start spinner

      const CurrencyIds = this.selectedCurrencyForDeletion.map((Currency: any) => Currency.id);
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('Please log in again.', 'error');
          this.isSubmitting = false;  // Stop spinner
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.CurrencyService.deleteMultipleCurrencys(CurrencyIds, headers).subscribe(
          () => {
              this.isSubmitting = false;  // Stop spinner
              this.fetchCurrencys();  // Refresh the Currency list after deletion
              this.deleteMultiplePopupVisible = false;  // Close the delete popup
              this.showToast(`${this.selectedCurrencyCount} Currency(s) deleted successfully`, 'warning');
          },
          (error) => {
              this.isSubmitting = false;  // Stop spinner
              this.showToast('Error deleting Currencys', 'error');
          }
      );
  }
 

  permitCurrencyActionColClick(e: any,  data: any) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } 
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  selectionChanged(data: any): void {
    this.selectedCurrencys = data.selectedRowsData;
  }

  onExportSelected(): void {
    // Export functionality remains unchanged
  }

  onColumnReordered(event: any): void {
    console.log('Columns reordered:', event);
  }

  private showToast(message: string, Currency: 'success' | 'error' | 'info' | 'warning'): void {
    switch (Currency) {
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
        console.warn(`Unsupported toast Currency: ${Currency}`);
        break;
    }
  }
}
