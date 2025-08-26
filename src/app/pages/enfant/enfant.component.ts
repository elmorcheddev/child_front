import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Enfant } from 'src/app/monClass/enfant';
import { Parent } from 'src/app/monClass/parent';
import { EnfantService } from 'src/app/monService/enfant.service';
import { ParentService } from 'src/app/monService/parent.service';
import { PaiementService } from 'src/app/monService/paiement.service';
import { Paiement } from 'src/app/monClass/paiement';
import { Classe } from 'src/app/monClass/classe';

// Declare bootstrap as a global variable
declare var bootstrap: any;

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {



  parentId!: number;
  parent: Parent = {
    id: 0,
    nom: '',
    prenom: '',
    relation: '',
    cin: '',
    adresse: '',
    telPrincipal: '',
    telSecondaire: '',
    email: '',
    profession: '',
    lieuTravail: '',
    telTravail: '',
    contactUrgenceNom: '',
    contactUrgenceTel: '',
    etat: false,
    enfants: []
  };
  enfants: Enfant[] = [];

  newEnfant: Enfant = {} as Enfant;
  paiment: Paiement={
    id: 0,
    parent: new Parent,
    enfant: new Enfant,
    montant: 0,
    mois: '',
    modePaiement: '',
    datePaiement: '',
    recuPdf: ''
  };
selectedEnfant: Enfant={
  id: 0,
  nom: '',
  prenom: '',
  dateNaissance: '',
  classe: new Classe,
  etatSante: '',
  parent: new Parent,
  payee: false
};   // L'enfant pour lequel on fait le paiement
modePaiement: string = ''; // 'Virement Banc' ou 'Cash'
montant: any;

  constructor(
    private paimentService:PaiementService,
    private route: ActivatedRoute,
    private parentService: ParentService,
    private enfantService: EnfantService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parentId = +params['parentId'];
      this.loadParent();
      this.loadEnfants();
    });
  }
public findPayment(enfantId:number){
  this.paimentService.getPaiementsByEnfant(enfantId).subscribe((data:any)=>{
    this.paiment=data;
  })
}
 

  loadParent() {
    this.parentService.getParentById(this.parentId).subscribe({
      next: p => this.parent = p,
      error: () => Swal.fire('Error', 'Failed to load parent', 'error')
    });
  }

loadEnfants() {
  this.enfantService.getEnfantsByParent(this.parentId).subscribe({
    next: (data: Enfant[]) => {
      this.enfants = data;
      console.log(this.enfants)
    },
    error: () => Swal.fire('Error', 'Failed to load enfants', 'error')
  });
}

  
editing: boolean = false; // flag to know if we're editing

 
 addEnfant() {
  if (this.editing) {
    this.enfantService.updateEnfant(this.newEnfant.id, this.newEnfant).subscribe(() => {
      this.loadEnfants();
      this.closeModal();
      Swal.fire('Mis à jour !', 'L\'enfant a été mis à jour avec succès.', 'success');
    });
  } else {
    this.enfantService.addEnfant(this.parent.id, this.newEnfant).subscribe((addedEnfant: Enfant) => {
      this.loadEnfants();
      this.closeModal();
      Swal.fire('Ajouté !', 'L\'enfant a été ajouté avec succès.', 'success').then(() => {

        
       });
    }, () => Swal.fire('Erreur', 'Impossible d\'ajouter l\'enfant', 'error'));
  }
}
payer(enfant: Enfant) {
  this.paimentService.payeEnfant(
      this.parentId,
      enfant.id,
      this.paiment.montant,
      this.paiment.mois,
      this.paiment.modePaiement
  ).subscribe(paiement => {
      // Étape 2 : télécharger le reçu via l'id retourné
      
    }, err => {
      console.error('Erreur paiement', err);
    });
}

// Close modal + reset form
closeModal() {
  const modalEl: any = document.getElementById('enfantModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  this.newEnfant = {} as Enfant;
  this.editing = false;
}

editEnfant(enfant: any) {
  this.newEnfant = { ...enfant };
  this.editing = true;
  const modal = new (window as any).bootstrap.Modal(document.getElementById('enfantModal'));
  modal.show();
}



 


 


  deleteEnfant(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enfantService.deleteEnfant(id).subscribe({
          next: () => {
            this.enfants = this.enfants.filter(e => e.id !== id);
            Swal.fire('Deleted!', 'Enfant has been deleted.', 'success');
          },
          error: () => Swal.fire('Error', 'Failed to delete enfant', 'error')
        });
      }
    });
  }
  openPaiementModal(enfant: Enfant) {
  this.selectedEnfant = enfant;
  this.modePaiement = '';
  const modal = new (window as any).bootstrap.Modal(document.getElementById('paiementModal'));
  modal.show();
}
 confirmerPaiement(modalEl: any) {
  if (!this.modePaiement) {
    Swal.fire('Erreur', 'Veuillez sélectionner un mode de paiement', 'warning');
    return;
  }

  this.paimentService.payeEnfant(
    this.parentId,
    this.selectedEnfant.id,
    this.montant,
    new Date().toISOString().slice(0,7),
    this.modePaiement
  ).subscribe(paiement => {
    this.selectedEnfant.payee = true;

    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    Swal.fire('Succès', 'Paiement effectué avec succès', 'success');
    
    // ✅ tu stockes l'id du paiement pour un futur téléchargement
    this.paiment = paiement; 
  }, err => {
    console.error('Erreur paiement', err);
    Swal.fire('Erreur', 'Impossible de traiter le paiement', 'error');
  });
}

downoadRecu(enfantId: number, enfantNom: string) {
  // Récupérer le paiement lié à l'enfant
  this.paimentService.getPaiementsByEnfant(enfantId).subscribe({
    next: (paiement: Paiement) => {
      if (!paiement || !paiement.id) {
        Swal.fire('Erreur', 'Aucun paiement trouvé pour cet enfant', 'error');
        return;
      }

      // Télécharger le PDF
      this.paimentService.downloadRecu(paiement.id).subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `recu_${enfantNom}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => Swal.fire('Erreur', 'Impossible de télécharger le reçu', 'error')
      });
    },
    error: () => Swal.fire('Erreur', 'Impossible de récupérer le paiement', 'error')
  });
}





}
