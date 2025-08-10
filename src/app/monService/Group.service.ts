import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../monClass/group';
import { environment } from '../auth/environment.prod';
 
@Injectable({
  providedIn: 'root'
})
export class GroupService {
    private baseUrl = environment.apiUrl; // URL globale
    
      // Construis ton url spécifique au endpoint ici
      private apiUrl = `${this.baseUrl}/Groups`;
 
  constructor(private http: HttpClient) {}

  create(Group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, Group);
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  update(id: number, Group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, Group);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
