import { Enfant } from "./enfant";
import { Parent } from "./parent";

export interface Paiement {
  id: number;

  parent: Parent;   // on ne stocke pas tout l'objet Parent, juste l'ID (bonne pratique pour API REST)
  enfant: Enfant;   // idem pour Enfant

  montant: number;    // ex: 250.0
  mois: string;       // ex: "Septembre 2025" ou "2025-09"
  modePaiement: string; // ex: Especes, Virement, Carte
  datePaiement: string; // ISO date string: "2025-09-01"

  recuPdf: string;   // encodé en base64 quand récupéré du backend
}