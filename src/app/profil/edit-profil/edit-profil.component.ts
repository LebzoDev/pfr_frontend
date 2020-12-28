import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { inputs } from '@syncfusion/ej2-angular-navigations/src/accordion/accordion.component';
import { ProfilService } from '../../service/profil.service';
import { Profil } from '../../modele/profil';
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  formGroup:any = FormGroup;
  data:any= this.profilService.form;
  @Output() closed = new EventEmitter<boolean>();
  @Input() editData:Profil = new Profil()
  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {
    //this.initForm();
    this.formGroup = this.profilService.form;
    //console.log(this.formGroup.value);
  }

  // initForm(){
  //   this.profilService.form = new FormGroup({
  //     libelle: new FormControl('',[Validators.required]),
  //   })
  // }
  onClose(){
    let data = true;
    this.closed.emit(data);
  }

  put( formulaire: NgForm,editData:Profil){
    this.data.value.libelle = formulaire.value.libelle;
    editData.libelle=formulaire.value.libelle
    console.log(formulaire.value.libelle)
    console.log(this.data.value);
    this.profilService.putProfil(editData)
    .subscribe(
      (result) => {
        console.log('Modification effectuée !'+result);
        this.onClose();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  

}
