import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icons } from './icons.model'; 
import { HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private baseUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/icons-info';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getIcons(): Observable<Icons[]> {
    return this.http.get<Icons[]>(this.baseUrl);
  }

  addIcon(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  updateIcon(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }

  deleteIcon(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleIcons(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/icons/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getIconById(id: number): Observable<Icons> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Icons>(url);
  }
}
