import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculum } from './curriculum.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/curriculum/course-curriculum';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.baseUrl);
  }

  addCurriculum(curriculum: Curriculum, headers?: HttpHeaders): Observable<Curriculum> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Curriculum>(this.baseUrl, curriculum, { headers });
  }

  updateCurriculum(curriculum: Curriculum, headers?: HttpHeaders): Observable<Curriculum> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${curriculum.id}`;
    return this.http.put<Curriculum>(url, curriculum, { headers });
  }

  deleteCurriculum(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleCurriculums(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getCurriculumById(id: number): Observable<Curriculum> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Curriculum>(url);
  }
}
