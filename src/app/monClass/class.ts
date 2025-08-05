import { Educateur } from "./Educateur ";

export interface Classe {
  id: number;
  nom: string;
  niveau: string;
  educateur?: Educateur;
  enfants?: any[];
}
