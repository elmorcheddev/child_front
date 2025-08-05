import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { EducateurComponent } from './pages/educateur/educateur.component';
import { ClassComponent } from './pages/class/class.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterAdminComponent },

  { path: 'login', component: LoginComponent },
  { path: 'educateur', component: EducateurComponent },
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'classe', component: ClassComponent },
  { path: '**', redirectTo: '/index' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
