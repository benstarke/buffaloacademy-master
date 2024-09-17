import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



interface LatestEventsInfo {
  id: number;
  title: string;
  description: string;
  image: string;
  topic: string;
  goal: string;
  location: string;
  hosted_by: string;
  event_day: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

@Component({
  selector: 'app-latest-events',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './latest-events.component.html',
  styleUrl: './latest-events.component.css'
})
export class LatestEventsComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  latestEventsInfo: LatestEventsInfo[] = [];
  latestEventsInfoLoaded: boolean = false;



  // internet connectivity
  connectionStatus: boolean = navigator.onLine;
  private onlineEventSubscription: EventListenerOrEventListenerObject;
  private offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
  ) {

    this.onlineEventSubscription = () => {
      this.connectionStatus = true;
      this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };
  }

  ngOnInit(): void {
    this.fetchLatestEventsInfo();
    
    // network connectivity
    this.updateConnectionStatus();
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    if (this.connectionStatus) {
      // this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.cd.detectChanges();
  }


   // network connectivity
  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };


  fetchLatestEventsInfo(): void {
    this.http.get<LatestEventsInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/home/buffalo-latest-events')
      .subscribe(
        (data) => {
          console.log('Fetched latest events info:', data);
          this.latestEventsInfo = data; // The response is already limited to 3 records
          this.latestEventsInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching latest events info', error);
          this.latestEventsInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  checkLoading(): void {
    this.loading = !(
      // this.simpleLearningStepsImageLoaded &&
      this.latestEventsInfoLoaded
    );
  }


}
