import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from './tag.model'; 
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/tags';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl);
  }

  // without token
  // addTag(tag: Tag): Observable<Tag> {
  //   return this.http.post<Tag>(this.baseUrl, tag);
  // }

  // with token
  addTag(tag: Tag, headers?: HttpHeaders): Observable<Tag> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    return this.http.post<Tag>(this.baseUrl, tag, { headers });
  }
  
  
// without token
  // updateTag(tag: Tag): Observable<Tag> {
  //   const url = `${this.baseUrl}/${tag.id}`;
  //   return this.http.put<Tag>(url, tag);
  // }
  updateTag(tag: Tag, headers?: HttpHeaders): Observable<Tag> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${tag.id}`;
    return this.http.put<Tag>(url, tag, { headers });
  }


  // without token
    // deleteTag(id: number): Observable<void> {
    //   const url = `${this.baseUrl}/${id}`;
    //   return this.http.delete<void>(url);
    // }

  //with token
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
    const url = `${this.baseUrl}/tags/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getTagById(id: number): Observable<Tag> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Tag>(url);
  }
}
