import { Child } from "./Child";
import { Teacher } from "./Teacher";


export class Group {
  id?: number;
  name!: string;
  ageMin!: number;
  ageMax!: number;
  capacity?: number;
  children: Child[] = [];
  teacher?: Teacher;

  constructor(init?: Partial<Group>) {
    Object.assign(this, init);
  }
}
