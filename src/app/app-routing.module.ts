import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfilComponent} from './profil/profil.component';
import { AddProfilComponent } from './profil/add-profil/add-profil.component';
import { MainNavComponent } from './main-nav/main-nav.component';

import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './users/admin/admin.component';
import { PageNotFoundComponent } from './login/page-not-found/page-not-found.component';
import { AddUserComponent } from './users/admin/add-user/add-user.component';
import { EditUserComponent } from './users/admin/edit-user/edit-user.component';
import { ProfilSortieComponent } from './profil-sortie/profil-sortie.component';
import { CompetencesComponent } from './competences/competences.component';


const routes: Routes = [
  {
    path:'',
    component: AccueilComponent
   },
   {
    path:'admin/users',
    component: AdminComponent,
    children:[
      {
        path: 'add', component:AddUserComponent
      },
      {
        path: 'edit',component:EditUserComponent
      }
    ]
   },
  {
   path:'login',
   component: LoginComponent
  },
  {
    path:'admin/profils',
    canActivate:[AuthGuard],
    component: ProfilComponent
   },
   {
    path:'admin/profil_sorties',
    canActivate:[AuthGuard],
    component: ProfilSortieComponent
   },
   {
    path:'admin/competences',
    canActivate:[AuthGuard],
    component: CompetencesComponent
   },
  {
    path:'not_found',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[LoginComponent];