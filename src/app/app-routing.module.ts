import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterAdminComponent },

  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/index' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
