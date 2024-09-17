import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from './material.model'; 
import { HttpEvent, HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/materials/course-materials';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.baseUrl);
  }

  // addMaterial(material: Material, headers?: HttpHeaders): Observable<Material> {
  //   if (!headers) {
  //       headers = new HttpHeaders();
  //   }
  //   return this.http.post<Material>(this.baseUrl, material, { headers });
  // }

  addMaterial(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  

  // updateMaterial(material: Material, headers?: HttpHeaders): Observable<Material> {
  //   if (!headers) {
  //       headers = new HttpHeaders();
  //   }
  //   const url = `${this.baseUrl}/${material.id}`;
  //   return this.http.put<Material>(url, material, { headers });
  // }

  // updateMaterial(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
  //   if (!headers) {
  //       headers = new HttpHeaders();
  //   }
  //   const url = `${this.baseUrl}/${material.get('id')}`;
  //   return this.http.put<HttpEvent<any>>(url, material, {
  //     headers: headers,
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }

  updateMaterial(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }


  // updateMaterial(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.put<any>(url, formData, {
  //       headers: headers,
  //       reportProgress: true,
  //       observe: 'events'
  //   });
  // }


  deleteMaterial(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleMaterials(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getMaterialById(id: number): Observable<Material> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Material>(url);
  }
}
