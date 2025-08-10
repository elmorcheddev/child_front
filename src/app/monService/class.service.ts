import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../monClass/class';
import { environment } from '../auth/environment.prod';
 
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
    private baseUrl = environment.apiUrl; // URL globale
    
      // Construis ton url spécifique au endpoint ici
      private apiUrl = `${this.baseUrl}/classes`;
 
  constructor(private http: HttpClient) {}

  create(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(this.apiUrl, classe);
  }

  getAll(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl);
  }

  getById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/${id}`);
  }

  update(id: number, classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, classe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
