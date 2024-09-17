import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DxPopupModule } from 'devextreme-angular';

interface CoursesInfo {
  id: number;
  course_category_id: number;
  course_sub_category_id: number;
  course_type_id: number;
  course_difficulty_id: number;
  course_tag_id: number;
  title_en: string;
  image: string;
  thumbnail_image: string;
  thumbnail_video: string;
  price: number | null;
  old_price: number | null;
  subscription_price: number | null;
  start_from: string;
  lesson: number | null;
  duration: number;
  instructor_id: number;
  instructor_name: string;
  instructor_bio: string;
  instructor_designation: string;
  instructor_email: string;
  instructor_image: string;
  category_name: string;
  sub_category_name: string;
  course_type_name: string;
  course_tag_name: string;
  course_difficulty_name: string;
}

interface CourseEnrolledStudentCountData {
  total_enrolled: number;
}


interface CourseOverviewData {
  id: number;
  course_id: number;
  description_en: string;
  prerequisites_en: string;
  who_this_course_is_for: string;
  what_you_will_be_learn: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
}

// interface CourseCountData {
//   course_count: number;
//   // other relevant fields if necessary
// }

interface CurriculumInfo {
  id: number;
  course_id: number;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  // FOR LESSON SUMMARY
  lessonSummary?: LessonSummary;
  lessonSummaryLoaded?: boolean;
  // for lessons
  lessons?: Lessons[];
  lessonsLoaded?: boolean;
}

export interface LessonSummary {
  total_lessons: number;
  total_duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface Lessons {
  id: number;
  title: string;
  course_curriculum_id: number;
  description: string;
  notes: string;
  minutes:number;
  seconds:number;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  // materials
  materials?: Materials[];
  materialsLoaded?: boolean;
}


export interface Materials {
  id: number;
  lesson_id: number;
  title: string;
  type: string;
  content: string;
  content_url: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
}




@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    DxPopupModule
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course!: CoursesInfo;
  totalEnrolled: number = 0;
  loading: boolean = true;
  coursesLoaded: boolean = false;
  coursesInfoLoaded: boolean = false;

  courseOverview!: CourseOverviewData;
  coursesOverviewInfoLoaded: boolean = false;

  // get courses instructor count
  totalCourses: number = 0;
  instructorCourseCount: number = 0;
  instructorId: number = 0;
  relatedCourses: any[] = [];
  coursesInstructorLoaded: boolean = false;

  // course curriculum
  // curriculum!: CurriculumInfo;
  curriculum: CurriculumInfo[] = [];
  curriculumInfoLoaded: boolean = false;

  connectionStatus: boolean = navigator.onLine;
  private onlineEventSubscription: EventListenerOrEventListenerObject;
  private offlineEventSubscription: EventListenerOrEventListenerObject;


  isPopupVisible: boolean = false;
  safeVideoUrl: SafeResourceUrl | null = null;  // Initialize with null

  // lesson summary
  // lessonsSummary: LessonSummary[] = [];
  // lessonsSummaryLoaded = false;
  // lessonSummary: LessonSummary | null = null;
  lessonSummaryLoaded: boolean = false;

  // lessons materials pop up
  isMaterialPopupVisible = false;
  currentlyOpenLessonId: number | null = null;
  // currentlyOpenLesson: any = null;
  currentlyOpenLesson: Lessons | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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

    // material popup
    // this.isMaterialPopupVisible = true;
  }


  // video pop up
  openVideoPopup(videoUrl: string) {
    const embedUrl = this.convertToEmbedUrl(videoUrl);
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    this.isPopupVisible = true;
  }

  closeVideoPopup() {
    this.isPopupVisible = false;
  }

  convertToEmbedUrl(videoUrl: string): string {
    const videoId = this.extractVideoId(videoUrl);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  extractVideoId(videoUrl: string): string | null {
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }
  

  ngOnInit(): void {
    this.updateConnectionStatus();
    window.addEventListener('online', this.onlineEventSubscription);
    window.addEventListener('offline', this.offlineEventSubscription);

    if (this.connectionStatus) {
      this.toastr.success('You are online!', '', { timeOut: 2000 });
    } else {
      this.toastr.error('You are offline. Please check your internet connection.', '', { timeOut: 2000 });
    }

    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('id'));
      if (courseId) {
        this.fetchCoursesInfo(courseId);
        this.fetchStudentsCoursesCount(courseId);
        this.fetchCourseOverview(courseId);
        this.fetchCurriculumInfo(courseId);
        this.fetchInstructorCourseCount(courseId);
        this.fetchRelatedCourses(courseId);
      } else {
        console.error('Course ID not found in route parameters');
      }
    });
  }
  

  fetchCoursesInfo(courseId: number): void {
    this.http.get<CoursesInfo>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${courseId}/detail-view`)
      .subscribe(
        (data) => {
          console.log('Fetched course info:', data);
          this.course = data;
          this.coursesInfoLoaded = true;
          this.checkLoading();
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching course info', error);
          this.coursesInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  fetchStudentsCoursesCount(courseId: number): void {
    this.http.get<CourseEnrolledStudentCountData>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${courseId}/total-enrolled`)
      .subscribe(
        (data) => {
          console.log('Fetched instructor courses count:', data);
          this.totalEnrolled = data.total_enrolled;
          this.coursesLoaded = true;
          this.checkLoading();
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching instructor courses count', error);
          this.totalEnrolled = 0;
          this.coursesLoaded = true;
          this.checkLoading();
        }
      );
  }

  
  fetchCourseOverview(courseId: number): void {
    this.http.get<CourseOverviewData>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${courseId}/course-overview`)
      .subscribe(
        (data) => {
          console.log('Fetched instructor courses overview:', data);
          this.courseOverview = data;
          this.coursesOverviewInfoLoaded = true;
          this.checkLoading();
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching instructor courses overview', error);
          this.coursesOverviewInfoLoaded = true;
          this.checkLoading();
        }
      );
  }

  
  fetchInstructorCourseCount(courseId: number): void {
    this.http.get<{ course_count: number, instructor_id: number }>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/${courseId}/course-count`)
        .subscribe(
            (data) => {
                console.log('Fetched instructor course count:', data.course_count);
                this.instructorCourseCount = data.course_count;
                this.instructorId = data.instructor_id;
            },
            (error: HttpErrorResponse) => {
                console.error('Error fetching instructor course count', error);
            }
        );
}

  

  
  fetchRelatedCourses(courseId: number): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/${courseId}/related-courses`)
        .subscribe(
            (data) => {
                console.log('Fetched related courses:', data);
                this.relatedCourses = data;
                // Optional: Add a check to ensure the current course is not included
                this.relatedCourses = this.relatedCourses.filter(course => course.course_id !== courseId);
            },
            (error: HttpErrorResponse) => {
                console.error('Error fetching related courses', error);
            }
        );
}



// fetchCurriculumInfo(courseId: number): void {
//   this.http.get<CurriculumInfo[]>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/${courseId}/curriculum`)
//     .subscribe(
//       (data) => {
//         console.log('Fetched course curriculum info:', data);
//         this.curriculum = data;
//         this.curriculumInfoLoaded = true;
//         this.checkLoading();
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error fetching course curriculum info', error);
//         this.curriculumInfoLoaded = true;
//         this.checkLoading();
//       }
//     );
// }

fetchCurriculumInfo(courseId: number): void {
  this.http.get<CurriculumInfo[]>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/${courseId}/curriculum`)
    .subscribe(
      (data) => {
        console.log('Fetched course curriculum info:', data);
        this.curriculum = data;
        this.curriculumInfoLoaded = true;
        this.curriculum.forEach(curriculumItem => {
          this.fetchLessonSummary(courseId, curriculumItem.id);
          this.fetchLessons(courseId, curriculumItem.id);
        });
        this.checkLoading();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching course curriculum info', error);
        this.curriculumInfoLoaded = true;
        this.checkLoading();
      }
    );
}

fetchLessonSummary(courseId: number, curriculumId: number): void {
  this.http.get<LessonSummary>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/${courseId}/curriculum/${curriculumId}/lessons-summary`)
    .subscribe(
      (data) => {
        console.log(`Fetched lesson summary for curriculum ${curriculumId}:`, data);
        const curriculumIndex = this.curriculum.findIndex(curr => curr.id === curriculumId);
        if (curriculumIndex > -1) {
          this.curriculum[curriculumIndex].lessonSummary = data;
          this.curriculum[curriculumIndex].lessonSummaryLoaded = true;
        }
        this.checkLoading();
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching lesson summary for curriculum ${curriculumId}`, error);
        const curriculumIndex = this.curriculum.findIndex(curr => curr.id === curriculumId);
        if (curriculumIndex > -1) {
          this.curriculum[curriculumIndex].lessonSummaryLoaded = true;
        }
        this.checkLoading();
      }
    );
}


fetchLessons(courseId: number, curriculumId: number): void {
  this.http.get<Lessons[]>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/${courseId}/curriculum/${curriculumId}/lessons`)
    .subscribe(
      (data) => {
        console.log(`Fetched lessons for curriculum ${curriculumId}:`, data);
        const curriculumIndex = this.curriculum.findIndex(curr => curr.id === curriculumId);
        if (curriculumIndex > -1) {
          this.curriculum[curriculumIndex].lessons = data;
          this.curriculum[curriculumIndex].lessonsLoaded = true;
          this.curriculum[curriculumIndex].lessons?.forEach(lesson => {
            this.fetchMaterials(courseId, curriculumId, lesson.id);
          });
        }
        this.checkLoading();
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching lessons for curriculum ${curriculumId}`, error);
        const curriculumIndex = this.curriculum.findIndex(curr => curr.id === curriculumId);
        if (curriculumIndex > -1) {
          this.curriculum[curriculumIndex].lessonsLoaded = true;
        }
        this.checkLoading();
      }
    );
}


fetchMaterials(courseId: number, curriculumId: number, lessonId: number): void {
  this.http.get<Materials[]>(`http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses/materials/${courseId}/${curriculumId}/${lessonId}`)
    .subscribe(
      (data) => {
        console.log(`Fetched materials for lesson ${lessonId}:`, data);
        // Find the index of the curriculum item
        const curriculumIndex = this.curriculum.findIndex(curr => curr.id === curriculumId);

        if (curriculumIndex !== -1) {
          const curriculumItem = this.curriculum[curriculumIndex];
          
          // Check if the curriculum item has lessons
          if (curriculumItem.lessons) {
            // Find the index of the lesson
            const lessonIndex = curriculumItem.lessons.findIndex(lesson => lesson.id === lessonId);

            if (lessonIndex !== -1) {
              // Update the lesson with fetched materials
              const lesson = curriculumItem.lessons[lessonIndex];
              lesson.materials = data;
              lesson.materialsLoaded = true;
            }
          }
        }

        // Check loading status after data processing
        this.checkLoading();
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching materials for lesson ${lessonId}`, error);
        
        // Find the index of the curriculum item
        const curriculumIndex = this.curriculum.findIndex(curr => curr.id === curriculumId);

        if (curriculumIndex !== -1) {
          const curriculumItem = this.curriculum[curriculumIndex];
          
          // Check if the curriculum item has lessons
          if (curriculumItem.lessons) {
            // Find the index of the lesson
            const lessonIndex = curriculumItem.lessons.findIndex(lesson => lesson.id === lessonId);

            if (lessonIndex !== -1) {
              // Update the lesson with error state
              const lesson = curriculumItem.lessons[lessonIndex];
              lesson.materialsLoaded = true;
            }
          }
        }

        // Check loading status after error processing
        this.checkLoading();
      }
    );
}




// materials popup
handleLinkClick(event: Event, lesson: Lessons): void {
  event.preventDefault(); // Prevent default anchor behavior

  // Only toggle if the lesson ID is different from the currently open one
  if (this.currentlyOpenLesson?.id !== lesson.id) {
    this.closePopup(); // Close any currently open popup
    setTimeout(() => {
      this.currentlyOpenLesson = lesson;
      this.isMaterialPopupVisible = true;
    }, 200); // Ensure the previous popup has time to close
  } else {
    this.closePopup(); // Close if the same lesson is clicked again
  }
}

closePopup(): void {
  this.isMaterialPopupVisible = false;
  // this.currentlyOpenLessonId = null;
  this.currentlyOpenLesson = null;
}

toggleMaterialPopup(): void {
  this.isMaterialPopupVisible = !this.isMaterialPopupVisible;
}

checkLoading(): void {
  if (
    this.coursesInfoLoaded && 
    this.coursesLoaded && 
    this.coursesOverviewInfoLoaded &&
    this.curriculumInfoLoaded &&
    this.curriculum.every(curriculumItem =>
      curriculumItem.lessonSummaryLoaded && 
      curriculumItem.lessonsLoaded &&
      (curriculumItem.lessons?.every(lesson => lesson.materialsLoaded) ?? true) // Ensure that each lesson's materials are also loaded
    )
    // Uncomment if needed
    // && this.coursesInstructorLoaded
  ) {
    this.loading = false;
    console.log('All data loaded');
  }
}

  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineEventSubscription);
    window.removeEventListener('offline', this.offlineEventSubscription);
  }

  private updateConnectionStatus = () => {
    this.connectionStatus = navigator.onLine;
  };
  
  shareOnInstagram(): void {
    const courseUrl = `http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${this.course.id}/detail-view`; // Replace with your actual URL
    const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(courseUrl)}`;
    window.open(instagramShareUrl, '_blank');
  }

  shareOnLinkedIn(): void {
    const courseUrl = `http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${this.course.id}/detail-view`; // Replace with your actual URL
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`;
    window.open(linkedInShareUrl, '_blank');
  }
  

  shareOnTwitter(): void {
    const courseUrl = `http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${this.course.id}/detail-view`; // Replace with your actual URL
    const tweetText = `Check out this course: ${this.course.title_en} ${courseUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterShareUrl, '_blank');
  }

  shareOnYouTube(): void {
    const videoUrl = `http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${this.course.id}/detail-view`; // Replace with your actual URL
    const youtubeShareUrl = `https://www.youtube.com/share?url=${encodeURIComponent(videoUrl)}`;
    window.open(youtubeShareUrl, '_blank');
  }
  

  shareOnFacebook(): void {
    const courseUrl = `http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details/${this.course.id}/detail-view`; // Replace with your actual URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`;
    window.open(facebookShareUrl, '_blank');
  }
}
