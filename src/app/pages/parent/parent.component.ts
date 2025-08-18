import { Component } from '@angular/core';
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

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents() {
    this.parentService.getAllParents().subscribe({
      next: (data) => this.parents = data,
      error: (err) => console.error(err)
    });
  }

  saveParent(form: any) {
    if (this.isEdit) {
      this.parentService.updateParent(this.parent.id!, this.parent).subscribe(() => {
        this.loadParents();
        this.resetForm(form);
      });
    } else {
      this.parentService.createParent(this.parent).subscribe(() => {
        this.loadParents();
        this.resetForm(form);
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
    if (confirm('Are you sure you want to delete this parent?')) {
      this.parentService.deleteParent(id).subscribe(() => {
        this.parents = this.parents.filter(p => p.id !== id);
      });
    }
  }

  resetForm(form: any) {
    form.resetForm();
    this.parent = {} as Parent;
    this.isEdit = false;
    const modal = document.getElementById('parentModal');
    if (modal) new (window as any).bootstrap.Modal(modal).hide();
  }
}