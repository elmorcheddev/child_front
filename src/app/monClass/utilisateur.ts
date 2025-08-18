import { RoleUtilisateur } from "./Roles";


export class Utilisateur {
  id: number;          // optional because it’s auto-generated in backend
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adresse?: string;
  tel: string;
  cin: string;
  dateNaissance?: string;
  etat: boolean;
  role: RoleUtilisateur;
}
