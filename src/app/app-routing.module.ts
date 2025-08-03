import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Redirect empty path to index
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/index' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
