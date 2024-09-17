import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/blog-categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(Category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, Category);
  }

  updateCategory(Category: Category): Observable<Category> {
    const url = `${this.baseUrl}/${Category.id}`;
    return this.http.put<Category>(url, Category);
  }

  deleteCategory(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Category>(url);
  }
}
