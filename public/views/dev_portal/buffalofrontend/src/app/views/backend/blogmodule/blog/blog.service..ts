import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog.model'; 

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/dblogs';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl);
  }

//   addBlog(blog: Blog): Observable<Blog> {
//     return this.http.post<Blog>(this.baseUrl, blog);
//   }

//   addBlog(blogData: FormData): Observable<Blog> {
//     return this.http.post<Blog>(this.baseUrl, blogData);
//   }
  addBlog(blog: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, blog);
  }
  

//   updateBlog(blog: Blog): Observable<Blog> {
//     const url = `${this.baseUrl}/${blog.id}`;
//     return this.http.put<Blog>(url, blog);
//   }

updateBlog(id: number, blog: FormData): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, blog);
  }
  
  
  

  deleteBlog(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getBlogById(id: number): Observable<Blog> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Blog>(url);
  }
}
