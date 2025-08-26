import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/monClass/classe';
import { ClasseService } from 'src/app/monService/Class.service';
import { Teacher } from 'src/app/monClass/Teacher';
import { TeacherService } from 'src/app/monService/Teacher.service';

declare var bootstrap: any;

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  classes: Classe[] = [];
  teachers: Teacher[] = [];

  // Model pour ngModel
  nomClass: string = '';
  manualClass: string = '';
  capacite: string = '';
  minAge: string = '';
  maxAge: string = '';
  teacherId: number | null = null;

  showManualInput: boolean = false;
  editMode: boolean = false;
  editClasseId?: number;
  modalInstance: any;

  constructor(private classeService: ClasseService , private teacherService:TeacherService) {}

  ngOnInit(): void {
    this.loadClasses();
    this.loadTeachers();
  }

  loadClasses() {
    this.classeService.getAllClasses().subscribe({
      next: data => this.classes = data,
      error: err => console.error(err)
    });
  }

  loadTeachers() {
    this.teacherService.getAllTeachers().subscribe({
      next: data => this.teachers = data,
      error: err => console.error(err)
    });
  }

  onClasseChange() {
    this.showManualInput = this.nomClass === 'Autre';
    if (!this.showManualInput) {
      this.manualClass = '';
    }
  }

  openModal() {
    this.editMode = false;
    this.resetForm();
    const modalEl = document.getElementById('classeModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  submitForm() {
    let finalNomClass = this.nomClass === 'Autre' ? this.manualClass : this.nomClass;

    const classeData: any = {
      nomClass: finalNomClass,
      capacite: this.capacite,
      minAge: this.minAge,
      maxAge: this.maxAge,
      teacher: this.teacherId ? { id: this.teacherId } : null
    };

    if (this.editMode && this.editClasseId) {
      this.classeService.updateClasse(this.editClasseId, classeData).subscribe(() => {
        this.loadClasses();
        this.modalInstance.hide();
      });
    } else {
      this.classeService.createClasse(classeData).subscribe(() => {
        this.loadClasses();
        this.modalInstance.hide();
      });
    }
  }

  editClasse(classe: Classe) {
    this.editMode = true;
    this.editClasseId = classe.id;

    if (['Petite section', 'Moyenne section', 'Grande section'].includes(classe.nomClass)) {
      this.nomClass = classe.nomClass;
      this.showManualInput = false;
    } else {
      this.nomClass = 'Autre';
      this.manualClass = classe.nomClass;
      this.showManualInput = true;
    }

    this.capacite = classe.capacite;
    this.minAge = classe.minAge;
    this.maxAge = classe.maxAge;
    this.teacherId = classe.teacher ? classe.teacher.id : null;

    const modalEl = document.getElementById('classeModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  deleteClasse(id: number) {
    if(confirm('Supprimer cette classe ?')) {
      this.classeService.deleteClasse(id).subscribe(() => this.loadClasses());
    }
  }

  resetForm() {
    this.nomClass = '';
    this.manualClass = '';
    this.capacite = '';
    this.minAge = '';
    this.maxAge = '';
    this.teacherId = null;
    this.showManualInput = false;
  }
}
