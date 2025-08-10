import { Group } from "./group";
import { Parent } from "./parent";


export class Child {
  id?: number;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: Date;
  gender?: string;
  allergies?: string;
  medicalNotes?: string;
  parent!: Parent;
  group?: Group;

  constructor(init?: Partial<Child>) {
    Object.assign(this, init);
  }
}
