import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Parent } from 'src/app/monClass/parent';
import { ParentService } from 'src/app/monService/parent.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  parents: Parent[] = [];
  parent: Parent = {} as Parent;
  isEdit = false;
  searchText: string;
  filteredParents: Parent[];

  constructor(private parentService: ParentService, private router: Router) {}

  ngOnInit(): void {
    this.loadParents();
  }

   
  loadParents() {
    this.parentService.getAllParents().subscribe({
      next: (data) => {
        this.parents = data;
        this.filteredParents = data; // Initially show all
      },
      error: (err) => Swal.fire('Error', 'Failed to load parents', 'error')
    });
  }

  // Search function
  filterParents() {
    const term = this.searchText.toLowerCase();
    this.filteredParents = this.parents.filter(p =>
      `${p.nom} ${p.prenom}`.toLowerCase().includes(term) ||
      (p.relation && p.relation.toLowerCase().includes(term)) ||
      (p.cin && p.cin.toLowerCase().includes(term)) ||
      (p.adresse && p.adresse.toLowerCase().includes(term)) ||
      (p.telPrincipal && p.telPrincipal.includes(term)) ||
      (p.telSecondaire && p.telSecondaire.includes(term)) ||
      (p.email && p.email.toLowerCase().includes(term)) ||
      (p.profession && p.profession.toLowerCase().includes(term)) ||
      (p.lieuTravail && p.lieuTravail.toLowerCase().includes(term)) ||
      (p.telTravail && p.telTravail.includes(term)) ||
      (p.contactUrgenceNom && p.contactUrgenceNom.toLowerCase().includes(term)) ||
      (p.contactUrgenceTel && p.contactUrgenceTel.includes(term)) ||
      (p.etat !== undefined && (p.etat ? 'activé' : 'désactivé').includes(term))
    );
  }

  saveParent(form: any) {
  if (this.isEdit) {
    this.parentService.updateParent(this.parent.id!, this.parent).subscribe({
      next: () => {
        this.loadParents();
        this.resetForm(form);
        Swal.fire('Updated!', 'Parent updated successfully', 'success');
      },
      error: (err) => {
        if (err.status === 409) {
          Swal.fire('Duplicate Email', err.error, 'warning');
        } else {
          Swal.fire('Error', 'Failed to update parent', 'error');
        }
      }
    });
  } else {
    this.parentService.createParent(this.parent).subscribe({
      next: (createdParent) => {
        this.loadParents();
        this.resetForm(form);
        Swal.fire('Created!', 'Parent created successfully', 'success')
          .then(() => {
            this.goToEnfantPage(createdParent.id).then(() => {
              location.reload();
            });
          });
      },
      error: (err) => {
        if (err.status === 409) {
          Swal.fire('Duplicate Email', err.error, 'warning');
        } else {
          Swal.fire('Error', 'Failed to create parent', 'error');
        }
      }
    });
  }
}



  editParent(p: Parent) {
    this.parent = { ...p };
    this.isEdit = true;
    const modal = document.getElementById('parentModal');
    if (modal) new (window as any).bootstrap.Modal(modal).show();
  }

  deleteParent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.parentService.deleteParent(id).subscribe({
          next: () => {
            this.parents = this.parents.filter(p => p.id !== id);
            Swal.fire('Deleted!', 'Parent has been deleted.', 'success').then(()=>{
              this.loadParents()
            });
          },
          error: () => Swal.fire('Error', 'Failed to delete parent', 'error')
        });
      }
    });
  }

  resetForm(form: any) {
    form.resetForm();
    this.parent = {} as Parent;
    this.isEdit = false;
    const modal = document.getElementById('parentModal');
    if (modal) new (window as any).bootstrap.Modal(modal).hide();
  }

  goToEnfantPage(parentId: number) {
    return this.router.navigate(['/enfants', { parentId }]);
  }
}
