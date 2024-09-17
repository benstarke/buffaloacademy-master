import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  

interface Course {
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

interface SubCategory {
  id: number;
  sub_category_name: string;
  courseCount: number;
}

interface Level {
  id: number;
  name: string;
  levelCount: number;
}

@Component({
  selector: 'app-search-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  displayedCourses: Course[] = [];
  subCategories: SubCategory[] = [];
  selectedSubCategories: number[] = [];
  allSelectedSubCategories: boolean = true;

  levels: Level[] = [];
  selectedLevels: number[] = [];
  allSelectedLevels: boolean = true;

  loadingCourses: boolean = true;
  loadingSubCategories: boolean = true;
  loadingLevels: boolean = true;

  minPrice: number = 0;
  maxPrice: number = 5000;

  selectedDurations: number[] = [];
  allSelectedDurations: boolean = true;
  durationRanges: { min: number, max: number | null }[] = [
    { min: 0, max: 5 },
    { min: 5, max: 10 },
    { min: 10, max: 15 },
    { min: 15, max: null }
  ];

  // PAGINATION
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  // Search text
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.loadCoursesWithDetails();
      this.loadSubCategories();
      this.loadLevels();
  }

  loadCoursesWithDetails(): void {
      this.http.get<Course[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-with-details').subscribe(data => {
          this.courses = data;
          this.filteredCourses = data;
          this.loadingCourses = false;
          this.updateCourseCounts();
          this.updatePagination();
      });
  }

  loadSubCategories(): void {
      this.http.get<SubCategory[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/course-sub-categories').subscribe(data => {
          this.subCategories = data.map(cat => ({ ...cat, courseCount: 0 }));
          this.updateCourseCounts();
          this.loadingSubCategories = false;
      });
  }

  loadLevels(): void {
      this.http.get<Level[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-difficulty').subscribe(data => {
          this.levels = data.map(level => ({ ...level, levelCount: 0 }));
          this.updateCourseCounts();
          this.loadingLevels = false;
      });
  }

  toggleSelectAllSubCategories(event: Event): void {
      this.allSelectedSubCategories = (event.target as HTMLInputElement).checked;
      this.selectedSubCategories = this.allSelectedSubCategories ? [] : this.subCategories.map(cat => cat.id);
      this.filterCourses();
  }

  toggleSubCategory(id: number): void {
      const index = this.selectedSubCategories.indexOf(id);
      if (index > -1) {
          this.selectedSubCategories.splice(index, 1);
      } else {
          this.selectedSubCategories.push(id);
      }
      this.allSelectedSubCategories = this.selectedSubCategories.length === 0;
      this.filterCourses();
  }

  toggleSelectAllLevels(event: Event): void {
      this.allSelectedLevels = (event.target as HTMLInputElement).checked;
      this.selectedLevels = this.allSelectedLevels ? [] : this.levels.map(level => level.id);
      this.filterCourses();
  }

  toggleLevel(id: number): void {
      const index = this.selectedLevels.indexOf(id);
      if (index > -1) {
          this.selectedLevels.splice(index, 1);
      } else {
          this.selectedLevels.push(id);
      }
      this.allSelectedLevels = this.selectedLevels.length === 0;
      this.filterCourses();
  }

  toggleSelectAllDurations(event: Event): void {
      this.allSelectedDurations = (event.target as HTMLInputElement).checked;
      this.selectedDurations = this.allSelectedDurations ? [] : this.durationRanges.map((_, index) => index);
      this.filterCourses();
  }

  toggleDuration(index: number): void {
      const durationIndex = this.selectedDurations.indexOf(index);
      if (durationIndex > -1) {
          this.selectedDurations.splice(durationIndex, 1);
      } else {
          this.selectedDurations.push(index);
      }
      this.allSelectedDurations = this.selectedDurations.length === 0;
      this.filterCourses();
  }

  onPriceRangeChange(): void {
      this.filterCourses();
  }

  applyFilter(event: Event): void {
      event.preventDefault(); // Prevent the default form submission behavior
      this.filterCourses();
      this.filterSearchCourses();
  }

  filterSearchCourses(): void {
      this.loadingCourses = true;
      this.http.get<Course[]>('http://127.0.0.1:8000/api/frontend-sub-system/public-home-courses/courses-real-time-search', {
          params: {
              searchText: this.searchText,
              selectedSubCategories: this.selectedSubCategories.join(','),
              selectedLevels: this.selectedLevels.join(','),
              minPrice: this.minPrice.toString(),
              maxPrice: this.maxPrice.toString(),
              selectedDurations: JSON.stringify(this.selectedDurations.map(index => this.durationRanges[index]))
          }
      }).subscribe(data => {
          this.filteredCourses = data;
          this.updateCourseCounts();
          this.updatePagination();
          this.loadingCourses = false;
      }, error => {
          console.error('Error fetching courses:', error);
          this.loadingCourses = false;
          this.filteredCourses = []; // Clear the filtered courses on error
      });
  }

  filterCourses(): void {
      let filtered = this.courses;

      if (!this.allSelectedSubCategories && this.selectedSubCategories.length > 0) {
          filtered = filtered.filter(course =>
              this.selectedSubCategories.includes(course.course_sub_category_id)
          );
      }

      if (!this.allSelectedLevels && this.selectedLevels.length > 0) {
          filtered = filtered.filter(course =>
              this.selectedLevels.includes(course.course_difficulty_id)
          );
      }

      filtered = filtered.filter(course => {
          const price = course.price ?? 0;
          return price >= this.minPrice && price <= this.maxPrice;
      });

      if (!this.allSelectedDurations && this.selectedDurations.length > 0) {
          filtered = filtered.filter(course => {
              return this.selectedDurations.some(index => {
                  const range = this.durationRanges[index];
                  return course.duration >= range.min && (range.max === null || course.duration < range.max);
              });
          });
      }

      this.filteredCourses = filtered;
      this.updateCourseCounts();
      this.updatePagination();
  }

  getCourseCountByDuration(index: number): number {
      const range = this.durationRanges[index];
      return this.courses.filter(course => course.duration >= range.min && (range.max === null || course.duration < range.max)).length;
  }

  updateCourseCounts(): void {
      this.subCategories.forEach(cat => {
          cat.courseCount = this.courses.filter(course => course.course_sub_category_id === cat.id).length;
      });
      this.levels.forEach(level => {
          level.levelCount = this.courses.filter(course => course.course_difficulty_id === level.id).length;
      });
  }

  // PAGINATION
  updatePagination(): void {
      this.totalPages = Math.ceil(this.filteredCourses.length / this.itemsPerPage);
      this.displayedCourses = this.filteredCourses.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.updatePagination();
      }
  }

  goToPage(page: number): void {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.updatePagination();
  }

  previousPage(): void {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.updatePagination();
      }
  }

  nextPage(): void {
      if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.updatePagination();
      }
  }

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
