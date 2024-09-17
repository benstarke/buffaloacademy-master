import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from './tag.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/course-tag';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl);
  }

  addTag(tag: Tag, headers?: HttpHeaders): Observable<Tag> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    return this.http.post<Tag>(this.baseUrl, tag, { headers });
  }
  
  updateTag(tag: Tag, headers?: HttpHeaders): Observable<Tag> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${tag.id}`;
    return this.http.put<Tag>(url, tag, { headers });
  }


  deleteTag(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleTags(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getTagById(id: number): Observable<Tag> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Tag>(url);
  }
}
