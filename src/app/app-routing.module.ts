import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';

import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { ParentsComponent } from './pages/parents/parents.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },

  { path: 'login', component: LoginComponent },
   { path: 'utilisateur', component: UtilisateurComponent },
   { path: 'parents', component: ParentsComponent },
   { path: '**', redirectTo: '/index' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
