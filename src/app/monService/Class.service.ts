import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../monClass/classe';
  
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = 'https://childrengard.onrender.com/api/Classes';

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl);
  }

  getClasseById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/${id}`);
  }

  createClasse(Classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(this.apiUrl, Classe);
  }

  updateClasse(id: number, Classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, Classe);
  }

  deleteClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
