import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



interface LandingPageInfo {
  id: number;
  title: string;
  description: string;
  image: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  landingPageInfo: LandingPageInfo[] = [];
  landingPageInfoLoaded: boolean = false;



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
      // this.toastr.info('You are back online!', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };

    this.offlineEventSubscription = () => {
      this.connectionStatus = false;
      // this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
      this.cd.detectChanges();
    };
  }

  ngOnInit(): void {
    this.fetchLandingPageInfo();
    
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


  fetchLandingPageInfo(): void {
    this.http.get<LandingPageInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/home/buffalo-landing-page')
      .subscribe(
        (data) => {
          console.log('Fetched buffalo landing page info:', data);
          this.landingPageInfo = data; // The response is already limited to 3 records
          this.landingPageInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching buffalo landing page info', error);
          this.landingPageInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  checkLoading(): void {
    this.loading = !(
      // this.simpleLearningStepsImageLoaded &&
      this.landingPageInfoLoaded
    );
  }
}
