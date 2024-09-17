import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from './type.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/course-type';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl);
  }

  addType(type: Type, headers?: HttpHeaders): Observable<Type> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Type>(this.baseUrl, type, { headers });
  }

  updateType(type: Type, headers?: HttpHeaders): Observable<Type> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${type.id}`;
    return this.http.put<Type>(url, type, { headers });
  }

  deleteType(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleTypes(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getTypeById(id: number): Observable<Type> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Type>(url);
  }
}
