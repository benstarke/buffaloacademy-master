import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from './enrollment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/enrollments/course-enrollments';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.baseUrl);
  }

  addEnrollment(enrollment: Enrollment, headers?: HttpHeaders): Observable<Enrollment> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Enrollment>(this.baseUrl, enrollment, { headers });
  }

  updateEnrollment(enrollment: Enrollment, headers?: HttpHeaders): Observable<Enrollment> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${enrollment.id}`;
    return this.http.put<Enrollment>(url, enrollment, { headers });
  }

  deleteEnrollment(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleEnrollments(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Enrollment>(url);
  }
}
