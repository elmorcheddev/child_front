import { Enfant } from "./enfant";

export class Parent {
  id: number;
  nom: string;
  prenom: string;
  relation: string; // père, mère, tuteur
  cin: string;
  adresse: string;
  telPrincipal: string;
  telSecondaire: string;
  email: string;
  profession: string;
  lieuTravail: string;
  telTravail: string;
  contactUrgenceNom: string;
  contactUrgenceTel: string;
  etat: boolean;
  enfants: Enfant[];
}
