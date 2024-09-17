import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActiveCoursesService } from './active-courses.service'; 
import { Course } from './active-courses.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './active-courses.component.html',
  styleUrls: ['./active-courses.component.css'],
  providers: [ActiveCoursesService]
})

export class ActiveCoursesComponent implements OnInit {
  courses: Course[] = [];
  currentCourses: Course[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  loading: boolean = true;

  constructor(private activeCoursesService: ActiveCoursesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.loading = true;
    this.activeCoursesService.getActiveCourses().subscribe(
      (data: Course[]) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log('Fetched Active Courses:', data);
          this.courses = data;
          this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updateCurrentCourses();
        } else {
          this.toastr.info('No active courses found.', 'Empty');
        }
        this.loading = false;
      },
      error => {
        console.error('Failed to fetch active courses', error);
        this.toastr.error('Failed to fetch active courses', 'Error');
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
