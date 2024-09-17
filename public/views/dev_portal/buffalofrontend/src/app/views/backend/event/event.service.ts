import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './event.model'; 


import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription, throwError, TimeoutError, of } from 'rxjs';
import { catchError, timeout, delay, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  //  to get all only
  private onlyUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/home/buffalo-latest-events/backend';
  
  // for remaining apis
  private baseUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/home/buffalo-latest-events'
  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.onlyUrl);
  }

  addEvent(eventData: FormData, headers?: HttpHeaders): Observable<any> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }

    // Ensure that Content-Type is not set in headers when sending FormData,
    // because it will be set automatically by the browser.
    headers = headers.delete('Content-Type'); 

    return this.http.post<any>(this.baseUrl, eventData, { headers });
  }



  updateEvent(event: Event, headers?: HttpHeaders): Observable<Event> {
      if (!headers) {
          headers = new HttpHeaders(); // Default to an empty headers object if none is provided
      }
      const url = `${this.baseUrl}/${event.id}`;
      return this.http.put<Event>(url, event, { headers });
  }

  deleteEvent(id: number, headers?: HttpHeaders): Observable<void> {
      if (!headers) {
          headers = new HttpHeaders(); // Default to an empty headers object if none is provided
      }
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<void>(url, { headers });
  }


  getEventById(id: number): Observable<Event> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Event>(url);
  }
}
