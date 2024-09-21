import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team.model'; 
import { HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://127.0.0.1:8000/api/site-information-sub-system/general-system-layout/team';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  addTeam(material: FormData, headers?: HttpHeaders): Observable<HttpEvent<any>> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post<HttpEvent<any>>(this.baseUrl, material, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  updateTeam(id: number, formData: FormData, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    });
  }

  deleteTeam(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleTeams(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders();
    }
    const url = `${this.baseUrl}/team/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getTeamById(id: number): Observable<Team> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Team>(url);
  }
}
