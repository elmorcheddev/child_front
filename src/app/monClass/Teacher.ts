import { Group } from './group';
import { Utilisateur } from './utilisateur';

export class Teacher {
  id: number;
  utilisateur: Utilisateur;
  qualification!: string;
  group: Group;

  constructor(init?: Partial<Teacher>) {
    Object.assign(this, init);
  }
}
