import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

declare var window: any;

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  listUsers: Utilisateur[] = [];
  filteredUsers: Utilisateur[] = [];
  utilisateur: Utilisateur = new Utilisateur();
  isEditMode = false;
  message = '';
  searchTerm: string = '';
  modal: any;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.modal = new window.bootstrap.Modal(document.getElementById('userModal'));
  }

  loadUsers(): void {
    this.utilisateurService.getAll().subscribe({
      next: data => {
        this.listUsers = data;
        this.applyFilter();
      },
      error: err => this.message = 'Erreur chargement utilisateurs : ' + err.message
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.filteredUsers = this.listUsers;
    } else {
      this.filteredUsers = this.listUsers.filter(u =>
        (u.nom && u.nom.toLowerCase().includes(term)) ||
        (u.prenom && u.prenom.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term))
      );
    }
  }

  openModalForAdd(): void {
    this.isEditMode = false;
    this.utilisateur = new Utilisateur();
    this.message = '';
    this.modal.show();
  }

  openModalForEdit(): void {
    this.message = '';
    this.modal.show();
  }

  editUser(id: number): void {
    this.utilisateurService.getById(id).subscribe({
      next: data => {
        this.utilisateur = data;
        this.isEditMode = true;
        this.openModalForEdit();
      },
      error: err => this.message = 'Erreur récupération utilisateur : ' + err.message
    });
  }

  saveUser(form: NgForm): void {
    this.message = '';
    if (!form.valid) {
      this.message = 'Formulaire invalide, veuillez corriger les erreurs.';
      return;
    }

    if (this.isEditMode) {
      this.utilisateurService.update(this.utilisateur.id!, this.utilisateur).subscribe({
        next: () => {
          this.message = 'Utilisateur mis à jour avec succès.';
          this.loadUsers();
          form.resetForm();
          this.isEditMode = false;
          this.modal.hide();
        },
        error: err => this.message = 'Erreur mise à jour : ' + err.message
      });
    } else {
      this.utilisateurService.create(this.utilisateur).subscribe({
        next: () => {
          this.message = 'Utilisateur ajouté avec succès.';
          this.loadUsers();
          form.resetForm();
          this.modal.hide();
        },
        error: err => this.message = 'Erreur création : ' + err.message
      });
    }
  }

  deleteUser(id: number): void {
    if (!confirm('Confirmer la suppression ?')) return;
    this.utilisateurService.delete(id).subscribe({
      next: () => {
        this.message = 'Utilisateur supprimé.';
        this.loadUsers();
      },
      error: err => this.message = 'Erreur suppression : ' + err.message
    });
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.isEditMode = false;
    this.utilisateur = new Utilisateur();
    this.message = '';
  }
}
