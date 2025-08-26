import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfant } from '../monClass/enfant';
 
@Injectable({
  providedIn: 'root'
})
export class EnfantService {

  private baseUrl = 'https://childrengard.onrender.com/api/enfants'; // change si nécessaire

  constructor(private http: HttpClient) { }
getListEnfants(): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(`${this.baseUrl}/list`);
  }
  // Ajouter un enfant → retourne Enfant
addEnfant(parentId: number, enfant: Enfant): Observable<Enfant> {
  return this.http.post<Enfant>(`${this.baseUrl}/parent/${parentId}`, enfant);
}

downloadReceipt(id: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/${id}/receipt`, { responseType: 'blob' });
}



  // Lister tous les enfants d'un parent
  getEnfantsByParent(parentId: number): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(`${this.baseUrl}/parent/${parentId}`);
  }

  // Récupérer un enfant par son ID
  getEnfantById(id: number): Observable<Enfant> {
    return this.http.get<Enfant>(`${this.baseUrl}/${id}`);
  }

  // Mettre à jour un enfant
  updateEnfant(id: number, enfant: Enfant): Observable<Enfant> {
    return this.http.put<Enfant>(`${this.baseUrl}/${id}`, enfant);
  }

  // Supprimer un enfant
  deleteEnfant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
 
}
