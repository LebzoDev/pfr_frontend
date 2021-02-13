import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import "pdfmake/build/pdfmake.js";
import "pdfmake/build/vfs_fonts.js";


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service'
import { EventsService } from './events.service';
import { ProfilService } from './service/profil.service';
import { ProfilComponent } from './profil/profil.component';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list';
import { AddProfilComponent } from './profil/add-profil/add-profil.component';
import { PageNotFoundComponent } from './login/page-not-found/page-not-found.component';
import { AccueilComponent } from './accueil/accueil.component'; 
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminComponent } from './users/admin/admin.component';
import { EditUserComponent } from './users/admin/edit-user/edit-user.component';
import { AddUserComponent } from './users/admin/add-user/add-user.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfilSortieComponent } from './profil-sortie/profil-sortie.component';
import { AddProfilSortieComponent } from './profil-sortie/add-profil-sortie/add-profil-sortie.component';
import { EditProfilSortieComponent } from './profil-sortie/edit-profil-sortie/edit-profil-sortie.component';
import { CompetencesComponent } from './competences/competences.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PromoComponent } from './promo/promo.component';
import { HeaderNavComponent } from './accueil/header-nav/header-nav.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatRadioModule} from '@angular/material/radio';
import { AddCompetenceComponent } from './competences/add-competence/add-competence.component';
import { AddGroupCompetenceComponent } from './competences/addGroupCompetence/add-group-competence/add-group-competence.component'; 
import { ToastrModule } from 'ngx-toastr';
import { AddReferentielComponent } from './promo/add-referentiel/add-referentiel.component';
import { ListReferentielsComponent } from './promo/list-referentiels/list-referentiels/list-referentiels.component';
import { ListCompetencesComponent } from './competences/list-competences/list-competences/list-competences.component';
import { ListGroupCompetencesComponent } from './competences/list-group-competences/list-group-competences/list-group-competences.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MenuComponent } from './menu/menu.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { ListPromosComponent } from './promo/list-promos/list-promos.component'; 

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfilComponent,
    AddProfilComponent,
    PageNotFoundComponent,
    AccueilComponent,
    EditProfilComponent,
    MainNavComponent,
    AdminComponent,
    EditUserComponent,
    AddUserComponent,
    ProfilSortieComponent,
    AddProfilComponent,
    AddProfilSortieComponent,
    EditProfilSortieComponent,
    CompetencesComponent,
    PromoComponent,
    HeaderNavComponent,
    AddCompetenceComponent,
    AddGroupCompetenceComponent,
    AddReferentielComponent,
    ListReferentielsComponent,
    ListCompetencesComponent,
    ListGroupCompetencesComponent,
    MenuComponent,
    AddPromoComponent,
    ListPromosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    LayoutModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    MatRadioModule,
    ToastrModule.forRoot(),
    MatCheckboxModule


  ],
  providers: [AuthServiceService,AuthGuard,EventsService,ProfilService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true 
  }],
  bootstrap: [AppComponent],
  entryComponents: [AddProfilComponent]
})
export class AppModule { }
