import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../monClass/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = 'https://childrengard.onrender.com/api/parents';

  constructor(private http: HttpClient) {}

  createParent(parent: Parent, utilisateurId: number): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl+'/create/'+utilisateurId, parent);
  }

}
