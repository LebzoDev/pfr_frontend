import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProfilService } from '../../service/profil.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  formGroup:any = FormGroup;
  constructor(private profilService: ProfilService, private dialogRef: MatDialogRef<EditProfilComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      libelle: new FormControl('',[Validators.required])
    })
  }

  put(formulaire: NgForm){
    console.log('c bon');
    console.log(formulaire.value);
    this.profilService.putProfil(formulaire.value)
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
