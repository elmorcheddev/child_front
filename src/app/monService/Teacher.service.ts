import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../monClass/Teacher';
import { environment } from '../auth/environment.prod';
 
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
private baseUrl = environment.apiUrl; // URL globale

  // Construis ton url spécifique au endpoint ici
  private apiUrl = `${this.baseUrl}/Teachers`;

  constructor(private http: HttpClient) {}

  create(Teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, Teacher);
  }

  getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  update(id: number, Teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, Teacher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByEmail(email: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/search?email=${encodeURIComponent(email)}`);
  }
}
