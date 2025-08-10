import { Child } from "./Child";

 export class Parent {
  id: number;
  relation!: string;
  utilisateur?: any;  // Pour simplifier, juste un id utilisateur côté front suffit
  children: Child[] = [];
}
