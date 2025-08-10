import { Child } from "./Child";
import { Utilisateur } from "./utilisateur";

 export class Parent {
  id: number;
  relation!: string;
  utilisateur: Utilisateur;  // Pour simplifier, juste un id utilisateur côté front suffit
  children: Child[] = [];
}
