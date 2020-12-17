import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { ProfilService } from '../../service/profil.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.css']
})
export class AddProfilComponent implements OnInit {
  formGroup:any = FormGroup;
  constructor(private profilService: ProfilService, private dialogRef: MatDialogRef<AddProfilComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      libelle: new FormControl('',[Validators.required])
    })
  }
  post(formulaire: NgForm){
    console.log('c bon');
    console.log(formulaire.value);
    this.profilService.postProfil(formulaire.value)
    .subscribe(
      (result) => {
        console.log('Enregistrement terminé !'+result);
        this.dialogRef.close();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );;
  }

}
