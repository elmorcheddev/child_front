import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit{

  admin: Utilisateur={
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    cin: '',
    email: '',
    password: '',
    etat: false,
    dateNaissance: '',
     roleUtilisateurs: [],
     confirmPasswrod: ''
  };
  image: any;
  doctormail: any;
  constructor(private utilisateurService:UtilisateurService, 
    private authService:AdminAuthService,
    private router:Router, 
    private activeRoute:ActivatedRoute){}  ngOnInit(): void {
 
   }
 
  
  inscriptionAdmin(form:NgForm){
    
  
  }
 
   
   
}
