import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from './lesson.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/lessons/course-lessons';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.baseUrl);
  }

  addLesson(lesson: Lesson, headers?: HttpHeaders): Observable<Lesson> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Lesson>(this.baseUrl, lesson, { headers });
  }

  updateLesson(lesson: Lesson, headers?: HttpHeaders): Observable<Lesson> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${lesson.id}`;
    return this.http.put<Lesson>(url, lesson, { headers });
  }

  deleteLesson(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleLessons(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getLessonById(id: number): Observable<Lesson> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Lesson>(url);
  }
}
