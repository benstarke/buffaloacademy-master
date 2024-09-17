import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';



export interface InstructorInfo {
  id: number;
  name_en: string;
  name_bn: string | null;
  contact_en: string;
  contact_bn: string | null;
  email: string;
  role_id: number;
  bio: string;
  title: string | null;
  designation: string | null;
  image: string | null;
  status: number;
  password: string;
  language: string;
  access_block: string | null;
  remember_token: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_by: string | null;
  updated_at: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  facebook: string | null;
}

interface EnrollmentData {
  enrollmentCount: number;
  // other relevant fields if necessary
}

interface CourseCountData {
  course_count: number;
  // other relevant fields if necessary
}


export interface EducationInfo {
  id: number;
  instructor_id: number;
  level_name: string;
  level_description: string;
  year_study: string;
  created_by: string | null;
  created_at: string | null;
  updated_by: string | null;
  updated_at: string | null;
}

interface EducationApiResponse {
  instructor: {
    id: number;
    name: string;
  };
  education: EducationInfo[];
}

export interface ExperienceInfo {
  id: number;
  instructor_id: number;
  experience_name: string;
  experience_description: string;
  experience_year: string;
  created_by: string | null;
  created_at: string | null;
  updated_by: string | null;
  updated_at: string | null;
}


interface ExperienceApiResponse {
  instructor: {
    id: number;
    name: string;
  };
  experience: ExperienceInfo[];
}


interface CourseInfo {
  id: number;
  course_category_id: number;
  course_sub_category_id: number;
  course_type_id: number;
  course_difficulty_id: number;
  course_tag_id: number;
  title_en: string;
  image: string;
  price: number | null;
  old_price: number | null;
  lesson: number | null;
  duration: number;
  instructor_id: number; 
  instructor_name: string;
  instructor_designation: string;
  instructor_email: string;
  instructor_image: string;
  category_name: string;
  sub_category_name: string;
  course_type_name: string;
  course_tag_name: string;
  course_difficulty_name: string;
}


interface CoursesApiResponse {
  instructor: {
    id: number;
    name: string;
  };
  courses: CourseInfo[];
}



@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.css'
})
export class InstructorProfileComponent implements OnInit, OnDestroy {

  // instructors: InstructorInfo[] = [];
  instructors: InstructorInfo | null = null;

  loading: boolean = true;

  instructorInfoLoaded: boolean = false;

  // get students enrollment count
  totalEnrollments: number = 0;
  enrollmentsLoaded: boolean = false;

  // get courses instructor count
  totalCourses: number = 0;
  coursesLoaded: boolean = false;

  // get education information
  educationInfo: EducationInfo[] = [];
  educationInfoLoaded: boolean = false;

  // get experience information
  experienceInfo: ExperienceInfo[] = [];
  experienceInfoLoaded: boolean = false;

  // get instructor related courses with details
  coursesInfo: CourseInfo[] = [];
  paginatedCoursesInfo: CourseInfo[] = [];
  coursesInfoLoaded: boolean = false;

  // PAGINATION
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  
  connectionStatus: boolean = navigator.onLine;
  private onlineEventSubscription: EventListenerOrEventListenerObject;
  private offlineEventSubscription: EventListenerOrEventListenerObject;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
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
   
    // contact form submission
    this.updateConnectionStatus();
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    if (this.connectionStatus) {
      this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.cd.detectChanges();

    // Get the instructorId from the route parameters
    this.route.paramMap.subscribe(params => {
      const instructorId = Number(params.get('id')); // Make sure 'id' matches the route parameter name
      if (instructorId) {
        this.fetchInstructorInfo(instructorId);
        this.fetchInstructorEnrollments(instructorId);
        this.fetchInstructorCoursesCount(instructorId);
        this.fetchEducationInfo(instructorId);
        this.fetchExperienceInfo(instructorId);
        this.fetchCoursesInfo(instructorId);
      } else {
        console.error('Instructor ID not found in route parameters');
      }
    });
  }


  fetchInstructorInfo(instructorId: number): void {
    this.http.get<InstructorInfo>(`http://127.0.0.1:8000/api/authentication-sub-system/instructor-sub-system-dashboard/instructor-operations/instructor-related-information/${instructorId}/information`)
      .subscribe(
        (data) => {
          console.log('Fetched instructor info:', data);
          this.instructors = data; // Assuming 'data' is of type InstructorInfo
          this.instructorInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching instructor info', error);
          this.instructors = null; // Optional: clear instructors on error
          this.instructorInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchInstructorEnrollments(instructorId: number): void {
    this.http.get<EnrollmentData>(`http://127.0.0.1:8000/api/authentication-sub-system/instructor-sub-system-dashboard/instructor-operations/instructor-students-enrollments/${instructorId}/enrollments`)
      .subscribe(
        (data) => {
          console.log('Fetched instructor enrollments:', data);
          this.totalEnrollments = data.enrollmentCount; // Assuming 'data' contains a field 'enrollmentCount'
          this.enrollmentsLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching instructor enrollments', error);
          this.totalEnrollments = 0; // Optional: clear totalEnrollments on error
          this.enrollmentsLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchInstructorCoursesCount(instructorId: number): void {
    this.http.get<CourseCountData>(`http://127.0.0.1:8000/api/authentication-sub-system/instructor-sub-system-dashboard/instructor-operations/instructor-courses/${instructorId}/courses-count`)
      .subscribe(
        (data) => {
          console.log('Fetched instructor courses count:', data);
          this.totalCourses = data.course_count; // Assuming 'data' contains a field 'course_count'
          this.coursesLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching instructor courses count', error);
          this.totalCourses = 0; // Optional: clear totalCourses on error
          this.coursesLoaded = true;
          this.checkLoading();
        }
      );
  }


  fetchEducationInfo(instructorId: number): void {
    this.http.get<EducationApiResponse>(`http://127.0.0.1:8000/api/authentication-sub-system/instructor-sub-system-dashboard/instructor-operations/instructor-related-education/${instructorId}/education`)
      .subscribe(
        (response) => {
          console.log('Fetched education info:', response);
          this.educationInfo = response.education; 
          this.educationInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching education info', error);
          this.educationInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  fetchExperienceInfo(instructorId: number): void {
    this.http.get<ExperienceApiResponse>(`http://127.0.0.1:8000/api/authentication-sub-system/instructor-sub-system-dashboard/instructor-operations/instructor-related-experience/${instructorId}/experience`)
      .subscribe(
        (response) => {
          console.log('Fetched experience info:', response);
          this.experienceInfo = response.experience; 
          this.experienceInfoLoaded = true;
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching experience info', error);
          this.experienceInfoLoaded = true;
          this.checkLoading();
        }
      );
  }


  fetchCoursesInfo(instructorId: number): void {
    this.http.get<CoursesApiResponse>(`http://127.0.0.1:8000/api/authentication-sub-system/instructor-sub-system-dashboard/instructor-operations/instructor-related-courses/${instructorId}/courses`)
      .subscribe(
        (response) => {
          console.log('Fetched courses info:', response);
          this.coursesInfo = response.courses; 
          this.coursesInfoLoaded = true;
          this.updatePagination(); // Ensure pagination is updated after fetching data
          this.checkLoading();
        },
        (error) => {
          console.error('Error fetching courses info', error);
          this.coursesInfoLoaded = true;
          this.checkLoading();
        }
      );
  }
  


  // checkLoading(): void {
  //   this.loading = !(
  //     this.instructorInfoLoaded && this.enrollmentsLoaded && this.coursesLoaded
  //   );
  // }

  checkLoading(): void {
    if (
      this.instructorInfoLoaded && 
      this.enrollmentsLoaded && 
      this.coursesLoaded && 
      this.educationInfoLoaded &&
      this.experienceInfoLoaded &&
      this.coursesInfoLoaded) {
      console.log('All data loaded');
      // Perform any additional actions if necessary
    }
  }


  //  contact form submission
  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };
 
  // getInstagramUrl(): string {
  //   if (this.instructors && this.instructors.instagram) {
  //     const instagram = this.instructors.instagram;
  
  //     // Normalize the URL by checking both 'https://' and non-'https://'
  //     if (instagram.startsWith('https://www.instagram.com/') || instagram.startsWith('www.instagram.com/')) {
  //       // If it starts with 'www.instagram.com/', prepend 'https://'
  //       if (instagram.startsWith('www.instagram.com/')) {
  //         return `https://${instagram}`;
  //       }
  //       return instagram;
  //     } else {
  //       // Otherwise, treat it as a username and construct the URL
  //       return `https://www.instagram.com/${instagram}`;
  //     }
  //   } else {
  //     // Default URL when Instagram is not available
  //     return 'https://www.instagram.com/';
  //   }
  // }

  getInstagramUrl(): string {
    return this.normalizeUrl(this.instructors?.instagram ?? undefined, 'https://www.instagram.com/');
  }
  
  getFacebookUrl(): string {
    return this.normalizeUrl(this.instructors?.facebook ?? undefined, 'https://www.facebook.com/');
  }
  
  getLinkedInUrl(): string {
    return this.normalizeUrl(this.instructors?.linkedin ?? undefined, 'https://www.linkedin.com/');
  }
  
  getTwitterUrl(): string {
    return this.normalizeUrl(this.instructors?.twitter ?? undefined, 'https://x.com/home?lang=en');
  }
  
  getYoutubeUrl(): string {
    return this.normalizeUrl(this.instructors?.youtube ?? undefined, 'https://www.youtube.com/');
  }
  
  // Helper method to normalize URLs
  private normalizeUrl(urlOrUsername: string | undefined, baseUrl: string): string {
    if (urlOrUsername) {
      // Normalize the URL by checking both 'https://' and 'www.'
      if (urlOrUsername.startsWith(baseUrl) || urlOrUsername.startsWith(baseUrl.replace('https://', 'www.'))) {
        // If it starts with 'www.', prepend 'https://'
        if (urlOrUsername.startsWith(baseUrl.replace('https://', 'www.'))) {
          return `https://${urlOrUsername}`;
        }
        return urlOrUsername;
      } else {
        // Otherwise, treat it as a username and construct the URL
        return `${baseUrl}${urlOrUsername}`;
      }
    } else {
      // Default URL when no input is available
      switch (baseUrl) {
        case 'https://www.instagram.com/':
          return 'https://www.instagram.com/';
        case 'https://www.facebook.com/':
          return 'https://www.facebook.com/';
        case 'https://www.linkedin.com/':
          return 'https://www.linkedin.com/';
        case 'https://x.com/home?lang=en':
          return 'https://x.com/home?lang=en';
        case 'https://www.youtube.com/':
          return 'https://www.youtube.com/';
        default:
          return baseUrl;
      }
    }
  }


  // PAGINATION
  // Update pagination information and the current page of courses
  updatePagination(): void {
    this.totalPages = Math.ceil(this.coursesInfo.length / this.itemsPerPage);
    this.paginatedCoursesInfo = this.coursesInfo.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  // Change to a specific page and update pagination
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Generate an array of page numbers for pagination controls
  getPageArray(): number[] {
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(this.currentPage - halfPagesToShow, 1);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pageArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }
  

}
