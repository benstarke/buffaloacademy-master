import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from './status.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/course-status';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl);
  }

  addStatus(Status: Status, headers?: HttpHeaders): Observable<Status> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    return this.http.post<Status>(this.baseUrl, Status, { headers });
  }

  updateStatus(Status: Status, headers?: HttpHeaders): Observable<Status> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${Status.id}`;
    return this.http.put<Status>(url, Status, { headers });
  }

  deleteStatus(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleStatuss(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getStatusById(id: number): Observable<Status> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Status>(url);
  }
}
