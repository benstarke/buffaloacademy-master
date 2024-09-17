import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface SimpleLearningStepsInfo {
  id: number;
  step_number: number;
  title: string;
  description: string;
  image: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

interface SimpleLearningStepsImage {
  id: number;
  image: string;
}


@Component({
  selector: 'app-buffalo-learning-steps',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './buffalo-learning-steps.component.html',
  styleUrl: './buffalo-learning-steps.component.css'
})
export class BuffaloLearningStepsComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  simpleLearningStepsInfo: SimpleLearningStepsInfo[] = [];
  simpleLearningStepsInfoLoaded: boolean = false;

  simpleLearningStepsImage: SimpleLearningStepsImage | null = null;
  simpleLearningStepsImageLoaded: boolean = false;

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
    this.fetchSimpleLearningStepsInfo();
    this.fetchSimpleLearningStepsImage();
    
    // network connectivity
    this.updateConnectionStatus();
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    if (this.connectionStatus) {
      this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
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


  fetchSimpleLearningStepsInfo(): void {
    this.http.get<SimpleLearningStepsInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/home/buffalo-simple-learning-steps/steps')
      .subscribe(
        (data) => {
          console.log('Fetched simple learning steps info:', data);
          // this.simpleLearningStepsInfo = data.slice(0, 3); // Limit to first 3 records
          this.simpleLearningStepsInfo = data; // The response is already limited to 3 records
          this.simpleLearningStepsInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching simple learning steps info', error);
          this.simpleLearningStepsInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  fetchSimpleLearningStepsImage(): void {
    this.http.get<SimpleLearningStepsImage>('http://127.0.0.1:8000/api/site-information-sub-system/home/buffalo-simple-learning-steps/image')
      .subscribe(
        (data) => {
          console.log('Fetched simple learning steps image:', data);
          this.simpleLearningStepsImage = data;
          this.simpleLearningStepsImageLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching simple learning steps image', error);
          this.simpleLearningStepsImageLoaded = true;
          this.checkLoading();
        }
      );
}


  checkLoading(): void {
    this.loading = !(
      this.simpleLearningStepsImageLoaded &&
      this.simpleLearningStepsInfoLoaded
    );
  }

}
