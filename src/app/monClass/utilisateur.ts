import { RoleUtilisateur } from "./Roles";

export class Utilisateur {
  id?: number;
  nom!: string;
  prenom!: string;
  email!: string;
  password!: string;
  adresse?: string;
  tel?: string;
  cin?: string;
  dateNaissance?: string;
  etat!: boolean;
  roleUtilisateurs: RoleUtilisateur[] = [];

  
}
