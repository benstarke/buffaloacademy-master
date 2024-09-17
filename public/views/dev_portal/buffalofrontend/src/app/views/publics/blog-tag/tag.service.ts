import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from './tag.model';

@Injectable({
    providedIn: 'root'
})
export class TagService {
    private baseUrl = 'http://127.0.0.1:8000/api/blog-sub-system/tags'; // Update with your actual base URL

    constructor(private http: HttpClient) {}

    getAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this.baseUrl}`);
    }

    getTagById(tagId: number): Observable<Tag> {
        return this.http.get<Tag>(`${this.baseUrl}/${tagId}`);
    }

    createTag(tagData: Tag): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, tagData);
    }

    updateTag(tagId: number, tagData: Tag): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${tagId}`, tagData);
    }

    deleteTag(tagId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${tagId}`);
    }
}
