import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from './status.model'; 
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/blog-status';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl);
  }

  // without token
  // addStatus(Status: Status): Observable<Status> {
  //   return this.http.post<Status>(this.baseUrl, Status);
  // }

  // with token
  addStatus(status: Status, headers?: HttpHeaders): Observable<Status> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    return this.http.post<Status>(this.baseUrl, status, { headers });
  }
  
  
  
// without token
  // updateStatus(Status: Status): Observable<Status> {
  //   const url = `${this.baseUrl}/${Status.id}`;
  //   return this.http.put<Status>(url, Status);
  // }
  updateStatus(status: Status, headers?: HttpHeaders): Observable<Status> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${status.id}`;
    return this.http.put<Status>(url, status, { headers });
}

  // without token
    // deleteStatus(id: number): Observable<void> {
    //   const url = `${this.baseUrl}/${id}`;
    //   return this.http.delete<void>(url);
    // }

  //with token
  deleteStatus(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }


  deleteMultipleStatuses(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/status/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getStatusById(id: number): Observable<Status> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Status>(url);
  }
}
