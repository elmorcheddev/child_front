import { Classe } from "./class";
import { Utilisateur } from "./utilisateur";


export interface Educateur extends Utilisateur {
  classe: Classe;
}
