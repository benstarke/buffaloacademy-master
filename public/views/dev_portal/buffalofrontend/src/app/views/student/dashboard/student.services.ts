import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student.models'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/manage-students';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  addStudent(student: Student, headers?: HttpHeaders): Observable<Student> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Student>(this.baseUrl, student, { headers });
  }

  updateStudent(student: Student, headers?: HttpHeaders): Observable<Student> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${student.id}`;
    return this.http.put<Student>(url, student, { headers });
  }

  deleteStudent(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleStudents(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Student>(url);
  }
}
