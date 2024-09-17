// blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, Category, Tag } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system';

  constructor(private http: HttpClient) { }

  getBlogs(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs?page=${page}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/blog-categories`);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/tags`);
  }

  getRecentBlogs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/recent-blogs`);
  }

  getBlogDetail(blogId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs/${blogId}`);
  }

  getRecentRelatedBlogs(blogId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs/${blogId}/related-recent`);
  }

  getRelatedCategories(blogId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/blogs/${blogId}/related-categories`);
  }

  getRelatedTags(blogId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/blogs/${blogId}/related-tags`);
  }

  getBlogsByCategory(categoryId: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs-by-category`, {
      params: { 
        category_id: categoryId,
        page: page.toString(),
        per_page: pageSize.toString()
      }
    });
  }

  getBlogsByTag(tagId: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/blogs-by-tag`, {
      params: { 
        tag_id: tagId,
        page: page.toString(),
        per_page: pageSize.toString()
      }
    });
  }

  // searchBlogs(searchText: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/search-blogs/blogs-real-time-search`, {
  //     params: {
  //       searchText
  //     }
  //   });
  // }

  // searchBlogs(searchText: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/search-blogs/blogs-real-time-search?searchText=${searchText}`);
  // }

  searchBlogs(searchText: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}/search-blogs/blogs-real-time-search?search=${searchText}`);
  }
}
