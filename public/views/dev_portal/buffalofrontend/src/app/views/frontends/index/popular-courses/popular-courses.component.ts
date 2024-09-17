import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



interface PopularCoursesInfo {
  id: number;
  title_en: string;
  description_en: string;
  course_category_id: number;
  course_sub_category_id: number;
  course_difficulty_id: number;
  course_tag_id: number;
  price: number | null;
  old_price: number | null;
  subscription_price: number;
  start_from: string;
  duration: number | null;
  lesson: number | null;
  category_name: string;
  sub_category_name: string;
  sub_category_status: string;
  instructor_id: number
  instructor_designation: string;
  instructor_name: string;
  instructor_email: string;
  instructor_image: string;
  course_type_name: string;
  course_tag_nam: string;
  course_difficulty_name: string;
  image: string;
  thumbnail_image: string;
  thumbnail_video: string;
  status: string;
  language: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
  course_count: string;

}


@Component({
  selector: 'app-popular-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './popular-courses.component.html',
  styleUrl: './popular-courses.component.css'
})
export class PopularCoursesComponent implements OnInit, OnDestroy {

  loading: boolean = true;

  // popular courses
  popularCoursesInfo: PopularCoursesInfo[] = [];
  popularCoursesInfoLoaded: boolean = false;

  // design courses
  designCoursesInfo: PopularCoursesInfo[] = [];
  designCoursesInfoLoaded: boolean = false;

  // development courses
  developmentCoursesInfo: PopularCoursesInfo[] = [];
  developmentCoursesInfoLoaded: boolean = false;

  // business courses
  businessCoursesInfo: PopularCoursesInfo[] = [];
  businessCoursesInfoLoaded: boolean = false;

  // design courses
  softwareCoursesInfo: PopularCoursesInfo[] = [];
  softwareCoursesInfoLoaded: boolean = false;




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
    this.fetchPopularCoursesInfo();
    this.fetchDesignCoursesInfo();
    this.fetchBusinessCoursesInfo();
    this.fetchDevelopmentCoursesInfo();
    this.fetchSoftwareCoursesInfo();
    
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


  fetchPopularCoursesInfo(): void {
    this.http.get<PopularCoursesInfo[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details')
      .subscribe(
        (data) => {
          console.log('Fetched buffalo popular courses info:', data);
          this.popularCoursesInfo = data; // The response is already limited to 3 records
          this.popularCoursesInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching buffalo popular courses info', error);
          this.popularCoursesInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  fetchDesignCoursesInfo(): void {
    this.http.get<PopularCoursesInfo[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/design-category-with-its-courses')
    .subscribe(
      (data) => {
        console.log('Fetched buffalo design courses info:', data);
        this.designCoursesInfo = data; // The response is already limited to 3 records
        this.designCoursesInfoLoaded = true;
        this.checkLoading();
      },
      (error) => {
        console.error('Error fetching buffalo design courses info', error);
        this.popularCoursesInfoLoaded = true;
        this.checkLoading();
      }
    );
  }
  

  
  fetchBusinessCoursesInfo(): void {
    this.http.get<PopularCoursesInfo[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/business-category-with-its-courses')
      .subscribe(
        (data) => {
          console.log('Fetched buffalo business courses info:', data);
          this.businessCoursesInfo = data; // The response is already limited to 3 records
          this.businessCoursesInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching buffalo business courses info', error);
          this.businessCoursesInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchDevelopmentCoursesInfo(): void {
    this.http.get<PopularCoursesInfo[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/development-category-with-its-courses')
      .subscribe(
        (data) => {
          console.log('Fetched buffalo development courses info:', data);
          this.developmentCoursesInfo = data; // The response is already limited to 3 records
          this.developmentCoursesInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching buffalo development courses info', error);
          this.developmentCoursesInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  fetchSoftwareCoursesInfo(): void {
    this.http.get<PopularCoursesInfo[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/it-and-software-category-with-its-courses')
      .subscribe(
        (data) => {
          console.log('Fetched buffalo software courses info:', data);
          this.softwareCoursesInfo = data; // The response is already limited to 3 records
          this.softwareCoursesInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching buffalo software courses info', error);
          this.softwareCoursesInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  checkLoading(): void {
    this.loading = !(
      this.designCoursesInfoLoaded &&
      this.popularCoursesInfoLoaded &&
      this.businessCoursesInfoLoaded &&
      this.developmentCoursesInfoLoaded &&
      this.softwareCoursesInfoLoaded
    );
  }
}
