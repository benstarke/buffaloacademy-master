import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partners } from './partners.model'; 
import { HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private baseUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/partners-info';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getPartners(): Observable<Partners[]> {
    return this.http.get<Partners[]>(this.baseUrl);
  }

  addPartner(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  updatePartner(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }

  deletePartner(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultiplePartners(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/partners/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getPartnerById(id: number): Observable<Partners> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Partners>(url);
  }
}
