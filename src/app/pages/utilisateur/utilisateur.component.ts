import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';
 
declare var window: any;  // Pour utiliser Bootstrap modal JS

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  listUsers: Utilisateur[] = [];
  utilisateur: Utilisateur = new Utilisateur();
  isEditMode = false;
  message = '';
  selectedFile?: File;
  modal: any;

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.loadUsers();

    // Initialiser le modal Bootstrap
    this.modal = new window.bootstrap.Modal(document.getElementById('userModal'));
  }

  loadUsers() {
    this.utilisateurService.getAll().subscribe(data => {
      this.listUsers = data;
    });
  }

  openModalForAdd() {
    this.isEditMode = false;
    this.utilisateur = new Utilisateur();
    this.message = '';
    this.selectedFile = undefined;
    this.modal.show();
  }

  openModalForEdit() {
    this.message = '';
    this.modal.show();
  }

  editUser(id: number) {
    this.utilisateurService.getById(id).subscribe(data => {
      this.utilisateur = data;
      this.isEditMode = true;
    });
  }

  saveUser(form: NgForm) {
    if (this.isEditMode) {
      this.utilisateurService.update(this.utilisateur.id!, this.utilisateur).subscribe(() => {
        this.message = 'Utilisateur mis à jour avec succès';
        this.loadUsers();
        form.resetForm();
        this.isEditMode = false;
        this.modal.hide();
      });
    } else {
      this.utilisateurService.create(this.utilisateur).subscribe(() => {
        this.message = 'Utilisateur ajouté avec succès';
        this.loadUsers();
        form.resetForm();
        this.modal.hide();
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.utilisateurService.delete(id).subscribe(() => {
        this.message = 'Utilisateur supprimé';
        this.loadUsers();
      });
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.isEditMode = false;
    this.utilisateur = new Utilisateur();
    this.message = '';
    this.selectedFile = undefined;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Si tu veux gérer l'upload du fichier, il faudra l'ajouter dans le formulaire
  }
}
