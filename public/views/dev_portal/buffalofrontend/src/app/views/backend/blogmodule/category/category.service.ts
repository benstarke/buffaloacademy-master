import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/blog-categories';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(category: Category, headers?: HttpHeaders): Observable<Category> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    return this.http.post<Category>(this.baseUrl, category, { headers });
  }

  updateCategory(category: Category, headers?: HttpHeaders): Observable<Category> {
      if (!headers) {
          headers = new HttpHeaders(); // Default to an empty headers object if none is provided
      }
      const url = `${this.baseUrl}/${category.id}`;
      return this.http.put<Category>(url, category, { headers });
  }

  // DELETE ONE RECORD AT A TIME
  deleteCategory(id: number, headers?: HttpHeaders): Observable<void> {
      if (!headers) {
          headers = new HttpHeaders(); // Default to an empty headers object if none is provided
      }
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<void>(url, { headers });
  }

  // DELETE MULTIPLE RECORDS ONCE
  deleteMultipleCategories(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/categories/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Category>(url);
  }
}
