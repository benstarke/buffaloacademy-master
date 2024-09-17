import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogStatus } from './status.model';  

@Injectable({
  providedIn: 'root'
})
export class BlogStatusService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/blog-status';

  constructor(private http: HttpClient) {}

  getBlogStatus(): Observable<BlogStatus[]> {
    return this.http.get<BlogStatus[]>(this.baseUrl);
  }

  addBlogStatus(blog: BlogStatus): Observable<BlogStatus> {
    return this.http.post<BlogStatus>(this.baseUrl, blog);
  }

  updateBlogStatus(blog: BlogStatus): Observable<BlogStatus> {
    const url = `${this.baseUrl}/${blog.id}`;
    return this.http.put<BlogStatus>(url, blog);
  }

  deleteBlogStatus(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getBlogStatusById(id: number): Observable<BlogStatus> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BlogStatus>(url);
  }
}
