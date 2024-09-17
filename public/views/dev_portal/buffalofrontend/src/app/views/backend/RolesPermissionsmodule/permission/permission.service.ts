import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from './permission.model'; // Assuming you have a Permission model

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private baseUrl = 'http://127.0.0.1:8000/api/user-system-roles/manage-roles';

  constructor(private http: HttpClient) {}

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.baseUrl);
  }

  addPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.baseUrl, permission);
  }

  updatePermission(permission: Permission): Observable<Permission> {
    const url = `${this.baseUrl}/${permission.id}`;
    return this.http.put<Permission>(url, permission);
  }

  deletePermission(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getPermissionById(id: number): Observable<Permission> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Permission>(url);
  }
}
