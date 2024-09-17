import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



interface CourseSubCategoryInfo {
  id: number;
  sub_category_name: string;
  sub_category_status: string;
  sub_category_image: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
  course_count: string;
}


@Component({
  selector: 'app-course-sub-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './course-sub-categories.component.html',
  styleUrl: './course-sub-categories.component.css'
})
export class CourseSubCategoriesComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  courseSubCategoryInfo: CourseSubCategoryInfo[] = [];
  courseSubCategoryInfoLoaded: boolean = false;



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
    this.fetchCourseSubCategoryInfo();
    
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


  fetchCourseSubCategoryInfo(): void {
    this.http.get<CourseSubCategoryInfo[]>('http://127.0.0.1:8000/api/site-information-sub-system/home/course-sub-categories/with-course-count')
      .subscribe(
        (data) => {
          console.log('Fetched buffalo course sub-categories info:', data);
          this.courseSubCategoryInfo = data; // The response is already limited to 3 records
          this.courseSubCategoryInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching buffalo course sub-categories info', error);
          this.courseSubCategoryInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  checkLoading(): void {
    this.loading = !(
      // this.simpleLearningStepsImageLoaded &&
      this.courseSubCategoryInfoLoaded
    );
  }
}
