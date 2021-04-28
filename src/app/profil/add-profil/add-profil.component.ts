import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { ProfilService } from '../../service/profil.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.css']
})
export class AddProfilComponent implements OnInit {
  formGroup:any = FormGroup;
  @Output() close = new EventEmitter<boolean>();
  constructor(
      private profilService: ProfilService,
      private toash:ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      libelle: new FormControl('',[Validators.required]),
    })
  }
  onClose(){
    let data = true;
    this.close.emit(data);
  }
  post(formulaire: NgForm){
    console.log('c bon add profil');
    console.log(formulaire.value);
    this.profilService.postProfil(formulaire.value)
    .subscribe(
      (result) => {
        console.log('Enregistrement terminé !'+result);
        this.toash.success("Un nouveau profil ajouté avec succes !!!",`${formulaire.value.libelle} added`,{
            closeButton:true
        });
        this.onClose();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );;
  }

}
