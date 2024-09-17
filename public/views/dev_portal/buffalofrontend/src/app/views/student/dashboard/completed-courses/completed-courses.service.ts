// src/app/all-courses/completed-courses.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './completed-courses.model';

@Injectable({
  providedIn: 'root'
})
export class CompletedCoursesService {
  private apiUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-dashboard/courses/completed';

  constructor(private http: HttpClient) {}

  getCompletedCourses(): Observable<Course[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Using template literals for better readability
    });

    return this.http.get<Course[]>(this.apiUrl, { headers });
  }
}



