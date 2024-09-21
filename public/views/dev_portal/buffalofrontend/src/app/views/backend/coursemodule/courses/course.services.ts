import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course.model'; 
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/courses';
  private apiUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/category-sub-category-mapping';
  private subCategoriesUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/subcategories'; // Define subcategories endpoint

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  // Method to check if course category and sub-category combination exists
  checkCategorySubCategoryCombination(courseCategoryId: number, courseSubCategoryId: number, headers?: HttpHeaders): Observable<boolean> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    const url = `${this.apiUrl}check-category-subcategory/combination?course_category_id=${courseCategoryId}&course_sub_category_id=${courseSubCategoryId}`;
    return this.http.get<boolean>(url, { headers });
  }  

  // Method to fetch sub-categories based on category selection
  fetchSubCategoriesByCategory(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}subcategories-by-category/${categoryId}`;
    return this.http.get(url);
  }

  

  // Method to add a new category-sub-category combination if it doesn't exist
  addCategorySubCategoryMapping(courseCategoryId: number, courseSubCategoryId: number, createdBy: string, headers?: HttpHeaders): Observable<any> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    const body = {
      course_category_id: courseCategoryId,
      course_sub_category_id: courseSubCategoryId,
      created_by: createdBy
    };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
  
  

  addCourse(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  // New method to fetch subcategories based on category ID
  getSubCategoriesByCategory(categoryId: string, headers?: HttpHeaders): Observable<any[]> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    const url = `${this.subCategoriesUrl}?categoryId=${categoryId}`;
    return this.http.get<any[]>(url, { headers });
  }
  

  updateCourse(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }

  deleteCourse(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleCourses(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getCourseById(id: number): Observable<Course> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Course>(url);
  }
}
