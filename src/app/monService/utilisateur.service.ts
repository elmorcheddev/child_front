import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
 
  URL="https://childrengard.onrender.com/api/utilisateur"
  constructor(private http:HttpClient) { }
 
   
 
  inscriptionAdmin(admin: Utilisateur) :Observable<Utilisateur>{
    return this.http.post<Utilisateur>(`${this.URL+"/ajouterSuperAdmin"}`, admin)

   }
  
   
 
}
