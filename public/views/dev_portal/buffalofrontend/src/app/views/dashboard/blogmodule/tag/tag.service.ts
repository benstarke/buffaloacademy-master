import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from './tag.model'; // Assuming you have a Tag model

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl);
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.baseUrl, tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    const url = `${this.baseUrl}/${tag.id}`;
    return this.http.put<Tag>(url, tag);
  }

  deleteTag(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getTagById(id: number): Observable<Tag> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Tag>(url);
  }
}
