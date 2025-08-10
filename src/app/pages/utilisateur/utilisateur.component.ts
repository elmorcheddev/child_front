import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { RoleUtilisateur } from 'src/app/monClass/Roles';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

declare var window: any;

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
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

  constructor(private utilisateurService: UtilisateurService) {}

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
}
