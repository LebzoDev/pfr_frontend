import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProfilsortieService } from '../../service/profilsortie.service';

@Component({
  selector: 'app-add-profil-sortie',
  templateUrl: './add-profil-sortie.component.html',
  styleUrls: ['./add-profil-sortie.component.css']
})
export class AddProfilSortieComponent implements OnInit {

  formGroup:any = FormGroup;
  @Output() closePS = new EventEmitter<boolean>();
  constructor(private profSortService:ProfilsortieService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      libelle_profil: new FormControl('',[Validators.required]),
    })
  }
  onClose(){
    let data = true;
    this.closePS.emit(data);
  }
  post(formulaire: NgForm){
    console.log('c bon');
    console.log(formulaire.value);
    this.profSortService.postProfilSortie(formulaire.value)
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
