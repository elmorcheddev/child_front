import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Educateur } from '../monClass/Educateur ';
import { environment } from '../auth/environment.prod';
 
@Injectable({
  providedIn: 'root'
})
export class EducateurService {
private baseUrl = environment.apiUrl; // URL globale

  // Construis ton url spécifique au endpoint ici
  private apiUrl = `${this.baseUrl}/educateurs`;
  
  constructor(private http: HttpClient) {}

  create(educateur: Educateur): Observable<Educateur> {
    return this.http.post<Educateur>(this.apiUrl, educateur);
  }

  getAll(): Observable<Educateur[]> {
    return this.http.get<Educateur[]>(this.apiUrl);
  }

  getById(id: number): Observable<Educateur> {
    return this.http.get<Educateur>(`${this.apiUrl}/${id}`);
  }

  update(id: number, educateur: Educateur): Observable<Educateur> {
    return this.http.put<Educateur>(`${this.apiUrl}/${id}`, educateur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByEmail(email: string): Observable<Educateur> {
    return this.http.get<Educateur>(`${this.apiUrl}/search?email=${encodeURIComponent(email)}`);
  }
}
