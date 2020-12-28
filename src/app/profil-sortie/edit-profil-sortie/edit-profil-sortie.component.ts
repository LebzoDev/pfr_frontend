import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ProfilsortieService } from '../../service/profilsortie.service';
import { ProfilSortie } from '../../modele/profil-sortie';

@Component({
  selector: 'app-edit-profil-sortie',
  templateUrl: './edit-profil-sortie.component.html',
  styleUrls: ['./edit-profil-sortie.component.css']
})
export class EditProfilSortieComponent implements OnInit {

  formGroup:any = FormGroup;
  data:any= this.profSortService.form;
  @Output() closedPS = new EventEmitter<boolean>();
  @Input() editDataPS:ProfilSortie=new ProfilSortie;
  constructor(private profSortService:ProfilsortieService) { }

  ngOnInit(): void {
    //this.initForm();
    this.formGroup = this.profSortService.form;
    //console.log(this.formGroup.value);
  }

  put( formulaire: NgForm,editData:ProfilSortie){
    this.data.value.libelle = formulaire.value.libelle;
    editData.libelleProfil=formulaire.value.libelle
    console.log(formulaire.value.libelle)
    console.log(this.data.value);
    this.profSortService.putProfilSortie(editData)
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

  onClose(){
    let data = true;
    this.closedPS.emit(data);
  }

}
