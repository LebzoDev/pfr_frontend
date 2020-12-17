import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppareilComponent } from './appareil/appareil.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './auth.guard';
import { ProfilComponent} from './profil/profil.component';
import { AddProfilComponent } from './profil/add-profil/add-profil.component';
import { AccueilComponent } from './accueil/accueil.component';
const routes: Routes = [
  {
    path:'',
    component: AccueilComponent
   },
  {
   path:'login',
   component: LoginComponent
  },
  {
   path:'appareils',
   canActivate:[AuthGuard],
   component: AppareilComponent
  },
  {
    path:'admin/profils',
    canActivate:[AuthGuard],
    component: ProfilComponent
   },
   {
    path:'admin/profils',
    canActivate:[AuthGuard],
    component: AddProfilComponent
   },
  {
    path:'special',
    canActivate:[AuthGuard],
    component: EventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[LoginComponent, AppareilComponent,EventsComponent];