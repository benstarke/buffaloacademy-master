import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl = 'http://127.0.0.1:8000/api/authentication-sub-system/manage-roles';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.baseUrl);
  }


  addRoles(roles: Roles, headers?: HttpHeaders): Observable<Roles> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    return this.http.post<Roles>(this.baseUrl, roles, { headers });
  }
  
  
  updateRoles(roles: Roles, headers?: HttpHeaders): Observable<Roles> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${roles.id}`;
    return this.http.put<Roles>(url, roles, { headers });
}

  deleteRoles(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }


  deleteMultipleRoles(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/roles/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getRolesById(id: number): Observable<Roles> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Roles>(url);
  }
}
