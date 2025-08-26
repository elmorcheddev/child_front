import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { ParentComponent } from './pages/parent/parent.component';
import { EnfantComponent } from './pages/enfant/enfant.component';
import { ListenfantComponent } from './pages/listenfant/listenfant.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
 import { ClasseComponent } from './pages/classe/classe.component';
import { PaimentsComponent } from './pages/paiments/paiments.component';
 


const routes: Routes = [
  { path: 'index', component: IndexComponent },

  { path: 'login', component: LoginComponent }, 
  { path: 'parent', component: ParentComponent }, 
  { path: 'enfants', component: EnfantComponent }, 
  { path: 'teacher', component: TeacherComponent }, 
  { path: 'paiments', component: PaimentsComponent }, 
  { path: 'classe', component: ClasseComponent }, 
  { path: 'listenfant', component: ListenfantComponent }, 
   { path: '**', redirectTo: '/index' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
