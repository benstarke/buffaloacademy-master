import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompletedCoursesService } from './completed-courses.service'; 
import { Course } from './completed-courses.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-completed-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './completed-courses.component.html',
  styleUrl: './completed-courses.component.css',
  providers: [CompletedCoursesService]
})
export class CompletedCoursesComponent implements OnInit {
  courses: Course[] = [];
  currentCourses: Course[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  loading: boolean = true;

  constructor(private activeCoursesService: CompletedCoursesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.loading = true;
    this.activeCoursesService.getCompletedCourses().subscribe(
      (data: Course[]) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('Fetched Active Courses:', data);
          this.courses = data;
          this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updateCurrentCourses();
        } else {
          this.toastr.info('No complete courses found.', 'Empty');
        }
        this.loading = false;
      },
      error => {
        console.error('Failed to fetch complete courses', error);
        this.toastr.error('Failed to fetch complete courses', 'Error');
        this.loading = false;
      }
    );
  }

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
