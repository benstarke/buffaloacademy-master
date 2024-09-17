// src/app/all-courses/active-courses.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './active-courses.model'; 

@Injectable({
  providedIn: 'root'
})
export class ActiveCoursesService {
  private apiUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-dashboard/courses/active';

  constructor(private http: HttpClient) {}

  getActiveCourses(): Observable<Course[]> {
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



