import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from './subcategory.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/course-sub-categories';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl);
  }

  addSubCategory(subCategory: SubCategory, headers?: HttpHeaders): Observable<SubCategory> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<SubCategory>(this.baseUrl, subCategory, { headers });
  }

  updateSubCategory(subCategory: SubCategory, headers?: HttpHeaders): Observable<SubCategory> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${subCategory.id}`;
    return this.http.put<SubCategory>(url, subCategory, { headers });
  }

  deleteSubCategory(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleSubCategories(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getSubCategoryById(id: number): Observable<SubCategory> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SubCategory>(url);
  }
}
