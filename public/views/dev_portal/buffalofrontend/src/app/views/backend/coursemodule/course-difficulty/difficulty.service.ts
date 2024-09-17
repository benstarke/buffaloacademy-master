import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Difficulty } from './difficulty.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/course-difficulty';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getDifficulties(): Observable<Difficulty[]> {
    return this.http.get<Difficulty[]>(this.baseUrl);
  }

  addDifficulty(difficulty: Difficulty, headers?: HttpHeaders): Observable<Difficulty> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Difficulty>(this.baseUrl, difficulty, { headers });
  }

  updateDifficulty(difficulty: Difficulty, headers?: HttpHeaders): Observable<Difficulty> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${difficulty.id}`;
    return this.http.put<Difficulty>(url, difficulty, { headers });
  }

  deleteDifficulty(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleDifficulties(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getDifficultyById(id: number): Observable<Difficulty> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Difficulty>(url);
  }
}
