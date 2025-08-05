import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { Educateur } from 'src/app/monClass/Educateur ';
import { EducateurService } from 'src/app/monService/educater.service';

@Component({
  selector: 'app-educateur',
  templateUrl: './educateur.component.html',
  styleUrls: ['./educateur.component.css']
})
export class EducateurComponent implements OnInit {
  educateurs: Educateur[] = [];
  filteredEducateurs: Educateur[] = [];
  educateur: Educateur ={
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
    confirmPasswrod: '',
    roleUtilisateurs: [],
    classe: {
      id: 0,
      nom: '',
      niveau: ''
    }
  }
  searchTerm: string = '';
  selectedFile?: File;

  constructor(private educateurService: EducateurService) {}

  ngOnInit(): void {
    this.loadEducateurs();
  }

  loadEducateurs() {
    this.educateurService.getAll().subscribe({
      next: (data) => {
        this.educateurs = data;
        this.filteredEducateurs = data;
      },
      error: (err) => console.error('Erreur chargement éducateurs', err)
    });
  }

  applyFilter(): Educateur[] {
    if (!this.searchTerm.trim()) {
      return this.filteredEducateurs;
    }
    const term = this.searchTerm.toLowerCase();
    return this.filteredEducateurs.filter(e =>
      (e.nom + ' ' + e.prenom).toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term) ||
      e.cin?.toLowerCase().includes(term)
    );
  }

  ajouterEducateur(form: NgForm) {
    if (form.invalid) return;
    this.educateurService.create(this.educateur).subscribe({
      next: () => {
        this.loadEducateurs();
        form.resetForm();
         // fermer modal via JS ou service bootstrap (à adapter)
      },
      error: (err) => console.error('Erreur ajout éducateur', err)
    });
  }

  editEducateur(e: Educateur) {
    this.educateur = { ...e }; // copie pour edition
    // ouvrir modal si besoin
  }

  deleteEducateur(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet éducateur ?')) {
      this.educateurService.delete(id).subscribe({
        next: () => this.loadEducateurs(),
        error: (err) => console.error('Erreur suppression', err)
      });
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
   }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // À gérer selon ta logique d'upload (non incluse ici)
  }
}
