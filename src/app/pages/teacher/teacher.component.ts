// src/app/monComponent/teacher/teacher.component.ts
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
 import { Enfant } from 'src/app/monClass/enfant';
 import { EnfantService } from 'src/app/monService/enfant.service';
import { Teacher } from 'src/app/monClass/Teacher';
import { TeacherService } from 'src/app/monService/Teacher.service';

declare var bootstrap: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachers: Teacher[] = [];
  enfants: Enfant[] = [];

  newTeacher: Teacher = {} as Teacher;
  editing: boolean = false;

  constructor(
    private teacherService: TeacherService,
    private enfantService: EnfantService
  ) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getAllTeachers().subscribe({
      next: t => this.teachers = t,
      error: () => Swal.fire('Erreur', 'Impossible de charger les teachers', 'error')
    });
  }

  openModal(teacher?: Teacher) {
    if (teacher) {
      this.newTeacher = { ...teacher };
      this.editing = true;
    } else {
      this.newTeacher = {} as Teacher;
      this.editing = false;
    }
    const modal = new (window as any).bootstrap.Modal(document.getElementById('teacherModal'));
    modal.show();
  }

  closeModal() {
    const modalEl: any = document.getElementById('teacherModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
    this.newTeacher = {} as Teacher;
    this.editing = false;
  }

  saveTeacher() {
    if (this.editing) {
      this.teacherService.updateTeacher(this.newTeacher.id, this.newTeacher).subscribe({
        next: () => {
          this.loadTeachers();
          this.closeModal();
          Swal.fire('Mis à jour !', 'Teacher mis à jour avec succès.', 'success');
        },
        error: () => Swal.fire('Erreur', 'Impossible de mettre à jour le teacher', 'error')
      });
    } else {
      this.teacherService.addTeacher(this.newTeacher).subscribe({
        next: added => {
          // Calculer le groupe automatiquement selon les enfants
           this.loadTeachers();
          this.closeModal();
          Swal.fire('Ajouté !', 'Teacher ajouté avec succès.', 'success');
        },
        error: () => Swal.fire('Erreur', 'Impossible d\'ajouter le teacher', 'error')
      });
    }
  }

 

  deleteTeacher(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.teacherService.deleteTeacher(id).subscribe({
          next: () => {
            this.teachers = this.teachers.filter(t => t.id !== id);
            Swal.fire('Supprimé!', 'Teacher supprimé avec succès.', 'success');
          },
          error: () => Swal.fire('Erreur', 'Impossible de supprimer le teacher', 'error')
        });
      }
    });
  }

  loadEnfants(teacherId: number) {
    const teacher = this.teachers.find(t => t.id === teacherId);
    if (teacher) {
       console.log(this.enfants)
    }
  }
}
