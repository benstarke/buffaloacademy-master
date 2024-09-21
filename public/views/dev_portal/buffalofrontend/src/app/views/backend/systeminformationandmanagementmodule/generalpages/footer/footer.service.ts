import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Footer } from './footer.model';  
import { HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private baseUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/footer-info';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getFooters(): Observable<Footer[]> {
    return this.http.get<Footer[]>(this.baseUrl);
  }

  addFooter(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  updateFooter(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }

  deleteFooter(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleFooters(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/footer/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getFooterById(id: number): Observable<Footer> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Footer>(url);
  }
}
