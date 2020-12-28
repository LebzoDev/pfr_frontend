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
  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private profilService:ProfilService,private authService: AuthServiceService,) { }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  

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

 

 ngOnInit(): void {
    this.getP();
  }
  loggout(){
    this.authService.deconnected();
  }

  // onCreateProfil(){
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.width = "60%";
  //     this.dialog.open(AddProfilComponent ,dialogConfig)
  //      .afterClosed().subscribe(()=>this.getP());
  // }

  onCreateProfil(){
     this.addProfil = true;
     console.log(this.addProfil);
  }

  // onEditProfil(row:any){
  //     this.profilService.populateform(row);
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.width = "60%";
  //     //console.log('row',row);
  //     this.dialog.open(EditProfilComponent, dialogConfig)
  //     .afterClosed().subscribe(()=>this.getP());
  // }

  onEditProfil(row:any){
    this.editProfil = true;
    this.editDataSend =  row;
    console.log(row);
  }

  onDeleteProfil(row:any){
    this.profilService.populateform(row);
    this.profilService.deleteProfil(row)
      .subscribe(result=>{
        console.log('Suppression faite');
        this.getP();
        //this.router.navigate(['/admin/profils']);
      },
      error=>{
        console.log(error);
      })
  }
}
