import { Component, Input } from '@angular/core';
import { Paiement } from 'src/app/monClass/paiement';
import { PaiementService } from 'src/app/monService/paiement.service';

@Component({
  selector: 'app-paiments',
  templateUrl: './paiments.component.html',
  styleUrls: ['./paiments.component.css']
})
export class PaimentsComponent {
  paiements: Paiement[] = [];
  filteredPaiements: Paiement[] = []; // For search filter
  searchText: string = ''; // The search input value

  @Input() parentId?: number;   
  @Input() enfantId?: number;   

  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  loadPaiements() {
    this.paiementService.getAllPaiements().subscribe((data: Paiement[]) => {
      this.paiements = data;
      this.filteredPaiements = data; // Initially show all
    });
  }

  downloadRecu(id: number) {
    this.paiementService.downloadRecu(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recu-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // Search function
  filterPaiements() {
    const term = this.searchText.toLowerCase();
    this.filteredPaiements = this.paiements.filter(p => 
      p.enfant.nom.toLowerCase().includes(term) ||
      p.enfant.prenom.toLowerCase().includes(term) ||
      p.mois.toLowerCase().includes(term) ||
      p.modePaiement.toLowerCase().includes(term) ||
      p.montant.toString().includes(term)
    );
  }
}
