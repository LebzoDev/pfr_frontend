import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProfilService } from '../service/profil.service';
import { AuthServiceService } from '../auth-service.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private profilService:ProfilService,private authService: AuthServiceService,
    private dialog:MatDialog) { }
  

  displayedColumns: string[] = ['id', 'libelle', 'archive','Edit','Delete'];
  dataSource = this.profilService.getProfils();
  

  ngOnInit(): void {
    this.profilService.getProfils()
       .subscribe(data=>{     
         console.log(data);
        })
  }

  loggout(){
    this.authService.deconnected();
  }

  onCreateProfil(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%"
      this.dialog.open(AddProfilComponent,dialogConfig);
  }

  onEditProfil(row:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%"
      this.dialog.open(EditProfilComponent,dialogConfig);
  }
}
