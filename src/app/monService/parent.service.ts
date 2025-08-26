import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../monClass/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private apiUrl = 'https://childrengard.onrender.com/api/parents'; // Spring Boot backend

  constructor(private http: HttpClient) {}

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.apiUrl);
  }

  getParentById(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/${id}`);
  }

  createParent(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl, parent);
  }

  updateParent(id: number, parent: Parent): Observable<Parent> {
    return this.http.put<Parent>(`${this.apiUrl}/${id}`, parent);
  }

  deleteParent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
