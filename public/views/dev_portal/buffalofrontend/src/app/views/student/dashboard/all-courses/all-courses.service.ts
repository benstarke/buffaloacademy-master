// src/app/all-courses/all-courses.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './all-courses.model';

@Injectable({
  providedIn: 'root'
})
export class AllCoursesService {
  private apiUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/student-sub-system-dashboard/courses/enrolled';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
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




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Course } from './all-courses.models';

// @Injectable({
//   providedIn: 'root'
// })
// export class AllCoursesService {
//   private apiUrl = 'your-api-url'; // Replace with your API URL

//   constructor(private http: HttpClient) {}

//   getAllCourses(): Observable<Course[]> {
//     return this.http.get<Course[]>(`${this.apiUrl}/student-sub-system-dashboard/courses`);
//   }
// }
