import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemAuditTrail } from './systemaudittrail.model'; 
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemAuditTrailService {
  private baseUrl = 'http://127.0.0.1:8000/api/activity-and-logs-sub-system/audit-trail';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {} 

  getSystemAuditTrail(): Observable<SystemAuditTrail[]> {
    return this.http.get<SystemAuditTrail[]>(this.baseUrl);
  }

  getSystemAuditTrailById(id: number): Observable<SystemAuditTrail> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SystemAuditTrail>(url);
  }
}
