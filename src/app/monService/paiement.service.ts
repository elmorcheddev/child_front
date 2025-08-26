// paiement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../monClass/paiement';
 
@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'https://childrengard.onrender.com/api/paiements'; // ⚠️ adapte l'URL selon ton backend

  constructor(private http: HttpClient) { }

  // 🔹 Créer un paiement
  createPaiement(paiement: {
    parentId: number;
    enfantId: number;
    montant: number;
    mois: string;
    modePaiement: string;
  }): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }

  // 🔹 Récupérer tous les paiements
  getAllPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  // 🔹 Récupérer un paiement par ID
  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer les paiements d’un parent
  getPaiementsByParent(parentId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/parent/${parentId}`);
  }

  // 🔹 Récupérer les paiements d’un enfant
  getPaiementsByEnfant(enfantId: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/enfant/${enfantId}`);
  }
 payeEnfant(parentId: number, enfantId: number, montant: number, mois: string, modePaiement: string): Observable<Paiement> {
  const payload = { parentId, enfantId, montant, mois, modePaiement };
  return this.http.post<Paiement>(this.apiUrl, payload);
}


 downloadRecu(id: number) {
  return this.http.get(`${this.apiUrl}/${id}/recu`, { responseType: 'blob' });
}



}
