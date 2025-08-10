import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { RoleUtilisateur } from 'src/app/monClass/Roles';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';
import { ParentService } from 'src/app/monService/parent.service';
import { Parent } from 'src/app/monClass/parent';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
setUserId(id: number) {
this.utilisateurService.getById(id).subscribe((data:Utilisateur)=>{
  console.log(data)
  this.utilisateur=data
})
}
  parent:Parent={
    id: 0,
    relation: '',
    children: [],
    utilisateur: {
      id: 0,
      nom: '',
      prenom: '',
      email: '',
      password: '',
      adresse: '',
      tel: '',
      cin: '',
      dateNaissance: '',
      etat: false,
      roleUtilisateurs: []
    }
  }
 
  listUsers: Utilisateur[] = [];
  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    etat: false,
    roleUtilisateurs: [],
    id: 0,
    adresse: '',
    tel: '',
    cin: '',
    dateNaissance: ''
  };
  isEditMode = false;
  message = '';
  modal: any;

  // Mock roles or fetch from your API
  allRoles: RoleUtilisateur[] = [
    { id: 1, nomRoles: 'ROLE_ADMIN' },
    { id: 2, nomRoles: 'ROLE_USER' },
    { id: 3, nomRoles: 'ROLE_PARENT' }
  ];

  constructor(private utilisateurService: UtilisateurService,private router:Router,  private parentService:ParentService) {}

  ngOnInit() {
    this.loadUsers();
    this.modal = new window.bootstrap.Modal(document.getElementById('userModal'));
  }

  loadUsers() {
    this.utilisateurService.getAll().subscribe({
      next: users => this.listUsers = users,
      error: err => this.message = 'Erreur chargement utilisateurs : ' + err.message
    });
  }

  openModalForAdd() {
    this.isEditMode = false;
    this.utilisateur = new Utilisateur();
    this.utilisateur.etat = true;  // Default to active user
    this.message = '';
    this.modal.show();
  }

  editUser(id: number | undefined) {
    if (!id) return;
    this.utilisateurService.getById(id).subscribe({
      next: data => {
        this.utilisateur = data;
        this.isEditMode = true;
        this.message = '';
        this.modal.show();
      },
      error: err => this.message = 'Erreur récupération utilisateur : ' + err.message
    });
  }

  saveUser(form: NgForm) {
    if (form.invalid) return;

    if (this.isEditMode && this.utilisateur.id) {
      this.utilisateurService.update(this.utilisateur.id, this.utilisateur).subscribe({
        next: () => {
          this.message = 'Utilisateur mis à jour avec succès';
          this.loadUsers();
          this.modal.hide();
          form.resetForm();
        },
        error: err => this.message = 'Erreur mise à jour : ' + err.message
      });
    } else {
      this.utilisateurService.create(this.utilisateur).subscribe({
        next: () => {
          this.message = 'Utilisateur ajouté avec succès';
          this.loadUsers();
          this.modal.hide();
          form.resetForm();
        },
        error: err => this.message = 'Erreur ajout : ' + err.message
      });
    }
  }
createdUtilisateurId: number | null = null;

 
 
 

  deleteUser(id: number | undefined) {
    if (!id) return;
    if (!confirm('Confirmer la suppression ?')) return;

    this.utilisateurService.delete(id).subscribe({
      next: () => {
        this.message = 'Utilisateur supprimé';
        this.loadUsers();
      },
      error: err => this.message = 'Erreur suppression : ' + err.message
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.isEditMode = false;
    this.utilisateur = new Utilisateur();
    this.message = '';
  }
  saveParent(form: NgForm) {
    if (form.invalid) return;

    if (!this.utilisateur || !this.utilisateur.id) {
      this.message = "Utilisateur non sélectionné pour la relation parent.";
      return;
    }

    this.parentService.createParent(this.parent, this.utilisateur.id).subscribe({
      next: (createdParent) => {
        this.message = 'Relation Parent ajoutée avec succès !';
        form.resetForm();

        // Fermer la modal Bootstrap parentModal
        const parentModalElement = document.getElementById('parentModal');
        const modalInstance = window.bootstrap.Modal.getInstance(parentModalElement);
        modalInstance?.hide();

        // Redirection vers /parents
        this.router.navigate(['/parents']);
      },
      error: (err) => {
        this.message = 'Erreur lors de l\'ajout de la relation parent : ' + err.message;
      }
    });
  }

}
