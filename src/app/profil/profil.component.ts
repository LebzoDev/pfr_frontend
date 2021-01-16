import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProfilService } from '../service/profil.service';
import { AuthServiceService } from '../auth-service.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { FormGroup, FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { Profil } from '../modele/profil';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  datasource: Profil[]=[];
  addProfil: boolean=false;
  editProfil: boolean=false;
  editDataSend:Profil=new Profil();
  pourcent: string = '80%';
  constructor(
      private breakpointObserver: BreakpointObserver,
      private router: Router,
      private profilService:ProfilService,
      private authService: AuthServiceService,
      private toash:ToastrService) { }

  ngOnInit(): void {
        this.getP();
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay());
  
  displayedColumns: string[] = ['id', 'libelle', 'archive','Edit','Delete'];

  getP(){
      this.profilService.getProfils()
          .subscribe(data=>{     
              console.log(data);
              this.datasource = data;
      })
  }

  onAddClosed(){
    this.addProfil=false;
    this.getP();
   
  }
  onEditClosed(){
    this.editProfil=false;
    this.getP();
  }

 
  loggout(){
    this.authService.deconnected();
  }

  onCreateProfil(){
     this.addProfil = true;
     console.log("c bon")
     console.log(this.addProfil);
  }

  onEditProfil(row:any){
    this.editProfil = true;
    this.editDataSend =  row;
  }

  onDeleteProfil(row:any){
    if (confirm("Souhaitez vous archiver ce profil ?")) {
      this.profilService.populateform(row);
      this.profilService.deleteProfil(row)
        .subscribe(result=>{
          this.toash.success("Profil supprimé avec succes !!!",`${row.libelle} archivé`);
          this.getP();
        },
        error=>{
          console.log(error);
        })
    }
  }
}
