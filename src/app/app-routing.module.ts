import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { ParentComponent } from './pages/parent/parent.component';
 


const routes: Routes = [
  { path: 'index', component: IndexComponent },

  { path: 'login', component: LoginComponent }, 
  { path: 'parent', component: ParentComponent }, 
   { path: '**', redirectTo: '/index' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
