import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Event } from '../event.model'; 
import { EventService } from '../event.service'; 
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxDateBoxModule, DxButtonModule, DxPopupModule, DxFormModule, DxTextBoxModule, DxTextAreaModule, DxMenuModule } from 'devextreme-angular';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

// pop up image
import { MatDialog } from '@angular/material/dialog';
import { SystemImageDialogComponent } from '../../../../system-image-dialog/system-image-dialog.component'; 
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

// file (image) upload
import { DxCheckBoxModule, DxFileUploaderModule, DxSelectBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-event-mgmt',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxTextBoxModule, 
    DxTextAreaModule,
    DxMenuModule,
    DxCheckBoxModule, DxFileUploaderModule, DxSelectBoxModule
  ],
  templateUrl: './event-mgmt.component.html',
  styleUrl: './event-mgmt.component.css'
})
export class EventMgmtComponent implements OnInit {
  addPopupVisible = false;
  updatePopupVisible = false;
  deletePopupVisible = false;
  addEventForm: FormGroup;
  updateEventForm: FormGroup;
  deleteEventForm: FormGroup;
  events: Event[] = [];
  noEventsMessage = '';

  permitEventMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  @ViewChild(DxDataGridComponent, { static: false }) categoriesGrid!: DxDataGridComponent;
  @ViewChild(DxMenuComponent, { static: false }) dxMenu!: DxMenuComponent;

  constructor(
    private eventService: EventService, 
    public toastr: ToastrService,
    private http: HttpClient,
    private dialog: MatDialog) {
    this.addEventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      hosted_by: new FormControl('', Validators.required),
      event_day: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.updateEventForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      hosted_by: new FormControl('', Validators.required),
      event_day: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.deleteEventForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      hosted_by: new FormControl('', Validators.required),
      event_day: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  // file (image) upload
  imageValue: any = null;
  imagePreview: string | ArrayBuffer | null = null;

  onFileUploaded(event: any) {
    const file = event.value[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  // pop up image
  openImageDialog(imageUrl: string): void {
    this.dialog.open(SystemImageDialogComponent, {
      data: { imageUrl },
      panelClass: 'custom-dialog-container'
    });
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

  fetchEvents(): void {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        console.log('Response:', events); // Log the entire response
        
        if (events && events.length > 0) {
          this.events = events;
          this.noEventsMessage = '';
          this.showToast('Events loaded successfully!', 'info');
          console.log('Events loaded successfully!:', this.events); // Log the loaded events
        } else {
          this.events = [];
          this.noEventsMessage = 'No events found';
          this.showToast(this.noEventsMessage, 'info');
          console.log('No events found. Message:', this.noEventsMessage); // Log the message when no events are found
        }
        
        // Log the final state of events and noEventsMessage
        console.log('Final Events Array:', this.events);
        console.log('Final No Events Message:', this.noEventsMessage);
      },
      (error: any) => {
        console.error('Error fetching Events:', error); // Log the error
        this.noEventsMessage = 'Error fetching Events';
        this.showToast(this.noEventsMessage, 'error');
      }
    );
  }

  onAddEventClick(): void {
    this.addPopupVisible = true;
  }

//   onAddEventSubmit(): void {
//     if (this.addEventForm.valid) {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             this.showToast('No token found. Please log in again.', 'error');
//             return;
//         }

//         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//         const formData = new FormData();

//         // Append form data fields
//         Object.keys(this.addEventForm.value).forEach(key => {
//             if (key === 'image') {
//                 const file = this.imageValue[0];
//                 if (file) {
//                     formData.append('image', file);
//                 }
//             } else {
//                 formData.append(key, this.addEventForm.value[key]);
//             }
//         });

//         this.eventService.addEvent(formData, headers).subscribe(
//             (response: any) => {
//                 if (response.success || response.message) {

//                     // Explicitly reset each form control
//                     this.addEventForm.reset();
//                     this.imageValue = []; // Clear image input
//                     Object.keys(this.addEventForm.controls).forEach(key => {
//                         this.addEventForm.controls[key].setValue('');
//                         this.addEventForm.controls[key].markAsPristine();
//                         this.addEventForm.controls[key].markAsUntouched();
//                     });

//                     this.addPopupVisible = false; // Close the add popup
//                     this.showToast('Event added successfully', 'success');
//                 } else {
//                     this.showToast(response.message || 'An unexpected error occurred', 'error');
//                 }
//             },
//             (error: any) => {
//                 if (error.status === 400 && error.error.error?.title) {
//                     this.showToast('Title must be unique', 'error');
//                 } else if (error.status === 422 && error.error.errors) {
//                     this.showToast('Validation error occurred', 'error');
//                 } else {
//                     this.showToast('Error adding event: ' + error.message, 'error');
//                 }
//             }
//         );
//     } else {
//         Object.keys(this.addEventForm.controls).forEach(key => {
//             if (this.addEventForm.controls[key].invalid) {
//                 this.showToast(`${key} is required or invalid`, 'error');
//             }
//         });
//     }
// }


onAddEventSubmit(): void {
  if (this.addEventForm.valid) {
      console.log('Form is valid, proceeding with submission...');
      const token = localStorage.getItem('token');
      if (!token) {
          this.showToast('No token found. Please log in again.', 'error');
          return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const formData = new FormData();

      Object.keys(this.addEventForm.value).forEach(key => {
          if (key === 'image') {
              const file = this.imageValue[0];
              if (file) {
                  formData.append('image', file);
              }
          } else {
              formData.append(key, this.addEventForm.value[key]);
          }
      });

      this.eventService.addEvent(formData, headers).subscribe(
          (response: any) => {
              console.log('Response received:', response);
              if (response.success || response.message) {
                  console.log('Success condition met, resetting form and closing popup...');

                  this.addEventForm.reset();
                  this.imageValue = null; // Clear image input

                  Object.keys(this.addEventForm.controls).forEach(key => {
                      this.addEventForm.controls[key].setValue('');
                      this.addEventForm.controls[key].markAsPristine();
                      this.addEventForm.controls[key].markAsUntouched();
                  });

                  this.addPopupVisible = false; // Close the add popup
                  console.log('Popup should be closed now');
                  this.showToast('Event added successfully', 'success');
              } else {
                  this.showToast(response.message || 'An unexpected error occurred', 'error');
              }
          },
          (error: any) => {
              if (error.status === 400 && error.error.error?.title) {
                  this.showToast('Title must be unique', 'error');
              } else if (error.status === 422 && error.error.errors) {
                  this.showToast('Validation error occurred', 'error');
              } else {
                  this.showToast('Error adding event: ' + error.message, 'error');
              }
          }
      );
  } else {
      Object.keys(this.addEventForm.controls).forEach(key => {
          if (this.addEventForm.controls[key].invalid) {
              this.showToast(`${key} is required or invalid`, 'error');
          }
      });
  }
}




  

  onPopupHidden() {
    this.fetchEvents();
  }


  onUpdateEventSubmit(): void {
    if (this.updateEventForm.valid) {
        const token = localStorage.getItem('token');
        if (!token) {
            this.showToast('No token found. Please log in again.', 'error');
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const updatedEvent: Event = {
            ...this.updateEventForm.value,
            updated_by: localStorage.getItem('email') || 'Unknown'
        };

        this.eventService.updateEvent(updatedEvent, headers).subscribe(
            (response) => {
                // console.log('Event updated successfully:', response);
                this.fetchEvents(); // Refresh the Event list
                this.updateEventForm.reset(); // Clear the form after update
                this.updatePopupVisible = false; // Close the update popup
                this.showToast('Event updated successfully', 'info');
            },
            (error) => {
                // console.error('Error updating Event:', error);
                this.showToast('Error updating Event', 'error');
            }
        );
    } else {
        Object.keys(this.updateEventForm.controls).forEach(key => {
            if (this.updateEventForm.controls[key].invalid) {
                this.showToast(`${key} is required or invalid`, 'error');
            }
        });
    }
}


onDeleteEventSubmit(): void {
  const eventId = this.deleteEventForm.value.id;
  
  const token = localStorage.getItem('token');
  if (!token) {
      this.showToast('No token found. Please log in again.', 'error');
      return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.eventService.deleteEvent(eventId, headers).subscribe(
      (response) => {
          // console.log('Event deleted successfully:', response);
          this.fetchEvents(); // Refresh the Event list after deletion
          this.deletePopupVisible = false; // Close the delete popup
          this.showToast('Event deleted successfully', 'warning');
      },
      (error) => {
          // console.error('Error deleting Event:', error);
          this.showToast('Error deleting Event', 'error');
      }
  );
}


  permitEventActionColClick(event: any, data: any): void {
    const action = event.itemData.action;
    if (action === 'edit_record') {
      this.funcEditDetails(data);
    } else if (action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }

  funcEditDetails(data: any): void {
    this.updateEventForm.patchValue(data.data);
    this.updatePopupVisible = true;
  }

  funcDeleteDetails(data: any): void {
    this.deleteEventForm.patchValue(data.data);
    this.deletePopupVisible = true;
  }

  selectionChanged(data: any): void {
    // Handle selection change if needed
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

