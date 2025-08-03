import { RoleUtilisateur } from "./Roles";

 
export class Utilisateur {
	    id:number;
	    nom:string;
	    prenom:string;
	    adresse:string;
	    tel:string;
 	    cin:string;
	    email:string;
	    password:string;
	    etat:boolean;
	    dateNaissance:string;
		confirmPasswrod:string
  	    roleUtilisateurs:RoleUtilisateur[];
  
}
