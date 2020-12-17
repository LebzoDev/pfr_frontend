import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

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
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfilComponent,
    AddProfilComponent,
    PageNotFoundComponent,
    AccueilComponent,
    EditProfilComponent
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
    MatSlideToggleModule
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
