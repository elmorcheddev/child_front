import { Classe } from "./classe";
import { Parent } from "./parent";

export class Enfant {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  classe: Classe;
  etatSante:string;
  parent:Parent
  payee:boolean
}
