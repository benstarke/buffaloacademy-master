import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from './about.model'; 
import { HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private baseUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/about/about-info';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getAbouts(): Observable<About[]> {
    return this.http.get<About[]>(this.baseUrl);
  }

  addAbout(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  updateAbout(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }

  deleteAbout(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleAbouts(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/about/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getAboutById(id: number): Observable<About> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<About>(url);
  }
}
