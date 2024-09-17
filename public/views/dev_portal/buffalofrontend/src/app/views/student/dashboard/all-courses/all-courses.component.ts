import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllCoursesService } from './all-courses.service'; 
import { Course } from './all-courses.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  // Curriculum
  curriculum?: CurriculumInfo[];
  curriculumLoaded?: boolean;
}




interface CurriculumInfo {
  id: number;
  course_id: number;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  altered_by: string | null;
  altered_on: string | null;
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
  altered_by: string | null;
  altered_on: string | null;
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
  altered_by: string | null;
  altered_on: string | null;
}


@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxPopupModule
  ],
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
  providers: [AllCoursesService]
})
export class AllCoursesComponent implements OnInit {
  course!: CoursesInfo;
  totalEnrolled: number = 0;
  loading: boolean = true;
  coursesLoaded: boolean = false;
  coursesInfoLoaded: boolean = false;

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


  isPopupVisible: boolean = false;
  safeVideoUrl: SafeResourceUrl | null = null;  // Initialize with null

  lessonSummaryLoaded: boolean = false;

  // lessons materials pop up
  isMaterialPopupVisible = false;
  currentlyOpenLessonId: number | null = null;
  // currentlyOpenLesson: any = null;
  currentlyOpenLesson: Lessons | null = null;


  courses: Course[] = [];
  currentCourses: Course[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  loadingCourses: boolean = true;

   // PAGINATION
  //  currentPage: number = 1;
  //  itemsPerPage: number = 4;
  //  totalPages: number = 1;

  // / CLIKECD LESSON
  courseTitle: string = '';
  courseId: number = 0;


  constructor(
    private allCoursesService: AllCoursesService, 
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {

    // Trigger the Popup Automatically When Returning from watch page
    this.route.queryParams.subscribe(params => {
      const courseId = params['courseId'];
      const courseTitle = params['courseTitle'];
  
      if (courseId && courseTitle) {
        // Trigger the pop-up
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.fetchCurriculumInfo(courseId);
        this.isMaterialPopupVisible = true;
  
        // Clear the query parameters after pop up  to prevent reopening it when navigating back to the course list again.
        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true
        });
      }
    });
  

    this.fetchCourses();
    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('id'));
      if (courseId) {
        this.fetchCurriculumInfo(courseId);
      } else {
        console.error('Course ID not found in route parameters');
      }
    });
  }

  fetchCourses(): void {
    this.loading = true; // Set loading to true when fetching starts
    this.allCoursesService.getAllCourses().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          console.log('Fetched All Courses:', data);
          this.courses = data;
          this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updateCurrentCourses();
        } else if (data.message) {
          this.toastr.info(data.message, 'No Courses');
        }
        this.loading = false; // Set loading to false when fetching is done
      },
      error => {
        console.error('Failed to fetch courses', error);
        this.toastr.error('Failed to fetch courses', 'Error');
        this.loading = false; // Set loading to false if fetching fails
      }
    );
  }


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


  checkLoading(): void {
    if (
      this.coursesInfoLoaded && 
      this.coursesLoaded && 
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


  // POP UP
  // courseTitle: string = ''; // Variable to store the course title
  // courseId: number = 0;  // Variable to store the course id
  
  // materials popup
  handleCourseClick(event: Event | null,  course: Course): void {
    // event.preventDefault(); // Prevent default anchor behavior
    if (event) {
      event.preventDefault(); // If event is not null, prevent the default behavior.
  }
    
    this.currentlyOpenLessonId = null; // Reset the currently open lesson ID
    this.currentlyOpenLesson = null; // Reset the currently open lesson

    this.courseTitle = course.title_en; // Store the course title
    this.courseId = course.id; // Store the course id
  
    this.curriculumInfoLoaded = false; // Reset curriculum loading status
  
    // Fetch the curriculum for the selected course
    this.fetchCurriculumInfo(course.id);
  
    // Set a timeout to ensure the curriculum is loaded before showing the popup
    setTimeout(() => {
      this.isMaterialPopupVisible = true;
    }, 200); // Adjust the timing if necessary
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


  // PAGINATION

  updateCurrentCourses(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.currentCourses = this.courses.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateCurrentCourses();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentCourses();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentCourses();
    }
  }
}
