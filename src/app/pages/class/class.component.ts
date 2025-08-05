import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Classe } from 'src/app/monClass/class';
import { ClasseService } from 'src/app/monService/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  listClasses: Classe[] = [];
  classe: Classe ={
    nom: '',
    niveau: '',
    id: 0
  }
  isEditMode = false;
  message = '';

  constructor(private classeService: ClasseService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classeService.getAll().subscribe({
      next: (data) => this.listClasses = data,
      error: (err) => console.error(err)
    });
  }

  saveClass(form: NgForm): void {
    if (this.isEditMode) {
      this.classeService.update(this.classe.id!, this.classe).subscribe({
        next: (res) => {
          this.message = 'Classe mise à jour avec succès.';
          this.resetForm(form);
          this.loadClasses();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.classeService.create(this.classe).subscribe({
        next: (res) => {
          this.message = 'Classe ajoutée avec succès.';
          this.resetForm(form);
          this.loadClasses();
        },
        error: (err) => console.error(err)
      });
    }
  }

  edit(id: number): void {
    this.classeService.getById(id).subscribe({
      next: (data) => {
        this.classe = data;
        this.isEditMode = true;
        this.message = '';
      },
      error: (err) => console.error(err)
    });
  }

  delete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
      this.classeService.delete(id).subscribe({
        next: () => {
          this.message = 'Classe supprimée avec succès.';
          this.loadClasses();
        },
        error: (err) => console.error(err)
      });
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
     this.isEditMode = false;
    this.message = '';
  }
}
