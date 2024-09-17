import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';

import { ToastrService } from 'ngx-toastr';
import { Event } from '../event.model'; 
import { EventService } from '../event.service'; 
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

// pop up image
import { MatDialog } from '@angular/material/dialog';
import { SystemImageDialogComponent } from '../../../../system-image-dialog/system-image-dialog.component'; 


@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
  ],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {

  events: Event[] = [];
  noEventsMessage = '';

  constructor(
    private eventService: EventService, 
    public toastr: ToastrService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEvents();
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
          // console.log('Events loaded successfully!:', this.events); // Log the loaded events
        } else {
          this.events = [];
          this.noEventsMessage = 'No events found';
          this.showToast(this.noEventsMessage, 'info');
          console.log('No events found. Message:', this.noEventsMessage); // Log the message when no events are found
        }
        
        // Log the final state of events and noEventsMessage
        // console.log('Final Events Array:', this.events);
        // console.log('Final No Events Message:', this.noEventsMessage);
      },
      (error: any) => {
        console.error('Error fetching Events:', error); // Log the error
        this.noEventsMessage = 'Error fetching Events';
        this.showToast(this.noEventsMessage, 'error');
      }
    );
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
