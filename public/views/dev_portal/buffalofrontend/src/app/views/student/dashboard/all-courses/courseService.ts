import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private selectedCourseId: number | null = null;
  private selectedCourseTitle: string | null = null;

  setSelectedCourse(id: number, title: string) {
    this.selectedCourseId = id;
    this.selectedCourseTitle = title;
  }

  getSelectedCourse() {
    return { id: this.selectedCourseId, title: this.selectedCourseTitle };
  }

  clearSelectedCourse() {
    this.selectedCourseId = null;
    this.selectedCourseTitle = null;
  }
}
