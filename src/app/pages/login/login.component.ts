import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AdminService } from '../../monService/admin.service';
import { AdminAuthService } from '../../monService/admin-auth.service';
import Swal from 'sweetalert2';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { RoleUtilisateur } from 'src/app/monClass/Roles';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  utilisateur: Utilisateur={
    nom: '',
    prenom: '',
    email: '',
    password: '',
    etat: false,
    role: new RoleUtilisateur,
    id: 0,
    tel: '',
    cin: '',
    adresse: '',
    dateNaissance: ''
  };
  constructor(private router: Router, private adminService: AdminService, private authAdmin: AdminAuthService) {}
  ngOnInit(): void {
   }
 login(form: NgForm) {
  console.log(form.value)
  this.adminService.loginAdmin(form.value).subscribe(
    (data: any) => {
      console.log(data)
      this.authAdmin.setRoles(data.utilisateur.role.nomRoles);
      this.authAdmin.setToken(data.token);
       
      if(data.utilisateur.etat == true) {
        if(!this.adminService.rolesMatch(['PATIENT'])) {
          // Success alert
          Swal.fire({
            icon: 'success',
            title: 'Bienvenue!',
            text: `Bien venu ${data.utilisateur.email}`,
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/index']).then(() => {
              window.location.reload();
            });
          });
        } else {
          this.authAdmin.logout();
          // Error alert
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Vérifier votre nom d'utilisateur ou votre mot de passe."
          });
        }
      } else {
        // Account disabled alert
        Swal.fire({
          icon: 'warning',
          title: 'Compte désactivé',
          text: "Votre compte a été désactivé."
        }).then(() => {
          this.authAdmin.clear();
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        });
      }
    },
    (error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Error alert for invalid login
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: "Vérifier votre nom d'utilisateur ou votre mot de passe."
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    }
  );
}

  
}
