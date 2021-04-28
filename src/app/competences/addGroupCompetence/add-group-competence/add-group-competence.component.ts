import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Form, Validators, FormArray } from '@angular/forms';
import { CompetenceService } from '../../../service/competence/competence.service';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { Competence } from '../../../promo/add-promo/add-promo.component';

@Component({
  selector: 'app-add-group-competence',
  templateUrl: './add-group-competence.component.html',
  styleUrls: ['./add-group-competence.component.css']
})
export class AddGroupCompetenceComponent implements OnInit {

  addGRoupCompForm: any= FormGroup;
  competences:Competence[]=[];
  competencesLookFor:Competence[]=[];
  constructor(
        private formbuild:FormBuilder,
        private competenceService:CompetenceService,
        private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getCompetences();
  }

  initForm(){
    this.addGRoupCompForm = this.formbuild.group({
      libelle:['',[Validators.required]],
      descriptif:['',[Validators.required]],
      // competences: this.formbuild.array([
      //     this.formbuild.control('')
      // ])
      competences: [[]]
    })
  }


  resetForm(){
    this.addGRoupCompForm = this.formbuild.group({
      libelle:[''],
      descriptif:[''],
      competences: [[]]
    })
  }

  // get competencesChoosed(){
  //   return this.addGRoupCompForm.get('competencesChoosed') as FormArray;
  // }

  getCompetences()
  {
      this.competenceService.getCompetences()
          .subscribe(
              data=>{
                  this.competences=data;
              },
              error=>{
                  console.log(error);
              })
  }

  getOneCompetence(libelle:any){
    this.competenceService.getOneCompetence(libelle)
          .subscribe(
              data=>{
                  this.competencesLookFor = data;
                  if(this.competencesLookFor.length>0){
                    console.log('yes');
                }
              },
              error=>{
                console.log(error);
              })
  }



  

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add new Competence
    if ((value || '').trim())
    {
        this.competenceService.getOneCompetence(value)
            .subscribe(
                data=>
                {
                    this.competencesLookFor = data;
                    if(this.competencesLookFor.length > 0)
                    {
                        var found = false;
                        for (let index = 0; index < this.competences.length; index++)
                        {
                            if (this.competences[index].libelle===this.competencesLookFor[0].libelle)
                            {
                              found= true;
                              break;
                            }
                        }
                        if (found)
                        {
                            this.toastr.warning('Competence déjà Ajoutée!','Attention!',
                                {
                                  closeButton:true,
                                });
                        }else
                        {
                            this.competences.push(data[0]);
                            this.toastr.success('Competence Ajoutée!','SUCCESS!',
                                {
                                  closeButton:true,
                                });
                        }
                      
                    }
                    else
                    {
                        this.toastr.error('Libellé Competence inexistante','FAILED',
                            {
                                timeOut: 3000,progressBar : true,
                            });
                    }  
            },
            error=>{
              console.log('error')
              console.log(error);
          })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  };

 
    

  remove(competence: Competence): void {
    const index = this.competences.indexOf(competence);
    if (index >= 0) {
      this.competences.splice(index, 1);
      this.toastr.warning(`Libelle:${competence.libelle}`,'Competence enlevée!',{
        closeButton:true,
      });
    }
  }

  AddGroupCompetence(){
    console.log('resultat');
    console.log(this.addGRoupCompForm.value);
    if(this.addGRoupCompForm?.valid){
      this.addGRoupCompForm.value.competences.forEach((element:any) => {
            //delete this.addGRoupCompForm.value.competences;
            this.addGRoupCompForm.value.idcompetence=element.id;
            //console.log(this.addGRoupCompForm.value);
            this.competenceService.postGroupCompetence(this.addGRoupCompForm.value)
                .subscribe(
                    data=>{
                      this.toastr.success('GROUPE DE COMPETENCE AJOUTÉE!','SUCCESS!',{
                        closeButton:true,});
                        this.resetForm();
                        console.log(data);
                    },
                    error=>{
                        console.log(error);
                    })
            //console.log(element);
      });
      console.log('c bon')
    }else{
      console.log('Pas encore')
    }
  }

}
