import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Enfant } from 'src/app/monClass/enfant';
import { EnfantService } from 'src/app/monService/enfant.service';

@Component({
  selector: 'app-listenfant',
  templateUrl: './listenfant.component.html',
  styleUrls: ['./listenfant.component.css']
})
export class ListenfantComponent {

  enfants: Enfant[] = [];
 
  constructor(private enfantService: EnfantService , private router:Router) {}

  ngOnInit(): void {
    this.loadenfant();
  }

  loadenfant() {
    this.enfantService.getListEnfants().subscribe({
      next: (data) => this.enfants = data,
      error: (err) => console.error(err)
    });
  }
 
  deleteEnfant(id: number) {
    if (confirm('Are you sure you want to delete this enfants?')) {
      this.enfantService.deleteEnfant(id).subscribe(() => {
        this.enfants = this.enfants.filter(p => p.id !== id);
      });
    }
  }
 
  
}