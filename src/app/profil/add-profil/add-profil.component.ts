import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { ProfilService } from '../../service/profil.service';

@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.css']
})
export class AddProfilComponent implements OnInit {
  formGroup:any = FormGroup;
  @Output() close = new EventEmitter<boolean>();
  constructor(private profilService: ProfilService) { }

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
        this.onClose();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );;
  }

}
