import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { CompetenceService, GroupCompetence } from 'src/app/service/competence/competence.service';
import { Competence } from '../promo.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddGroupCompetenceComponent } from '../../competences/addGroupCompetence/add-group-competence/add-group-competence.component';
import { element } from 'protractor';
import { PromoService } from 'src/app/service/promo/promo.service';

@Component({
  selector: 'app-add-referentiel',
  templateUrl: './add-referentiel.component.html',
  styleUrls: ['./add-referentiel.component.css']
})
export class AddReferentielComponent implements OnInit {

  addRefForm: any= FormGroup;
  groupCompetences: GroupCompetence[]=[];
  groupCompetencesLookFor: GroupCompetence[]=[];
  pdfFileToUpload:any= File;
  evaluation:string[]=[];
  admission:string[]=[];

  constructor(
        private formbuild:FormBuilder,
        private competenceService:CompetenceService,
        private toastr:ToastrService,
        private promoService:PromoService) { }

        ngOnInit(): void {
          this.initForm();
          this.getGroupCompetences();
       
        }
      
        initForm(){
          this.addRefForm = this.formbuild.group({
            libelle:['',[Validators.required]],
            presentation:['',[Validators.required]],
            pdfFile:[],
            admission:[[]],
            evaluation:[[]],
            groupCompetences: [[]]
          })
        }
      
      
    resetForm(){
          this.addRefForm = this.formbuild.group({
            libelle:[''],
            presentation:[''],
            pdfFile:[],
            admission:[[]],
            evaluation:[[]],
            groupCompetences: [[]]
          })
        }
      

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  AddGroupCompetenceEvent(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add new Competence
    if ((value || '').trim())
    {
        this.competenceService.getOneGroupCompetence(value)
            .subscribe(
                data=>
                {
                    this.groupCompetencesLookFor = data;
                    if(this.groupCompetencesLookFor.length > 0)
                    {
                        var found = false;
                        for (let index = 0; index < this.groupCompetences.length; index++)
                        {
                            if (this.groupCompetences[index].libelle===this.groupCompetencesLookFor[0].libelle)
                            {
                              found= true;
                              break;
                            }
                        }
                        if (found)
                        {
                            this.toastr.warning('Groupe deCompetence déjà Ajoutée!','Attention!',
                                {
                                  closeButton:true,
                                });
                        }else
                        {
                            this.groupCompetences.push(data[0]);
                            this.toastr.success('Competence Ajoutée!','SUCCESS!',
                                {
                                  closeButton:true,
                                });
                        }
                      
                    }
                    else
                    {
                        this.toastr.error('Libellé Groupe de Competence inexistante','FAILED',
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
  addAdmissionCriteriaEvent(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add new Competence
    if ((value || '').trim())
    {

      if (this.admission.includes(value))
      {
          this.toastr.warning('Critère déjà Ajoutée!','Attention!',
              {
                  closeButton:true,
              });
      }else
      {
        this.admission.push(value);
        this.toastr.success('Critère d\'admission Ajoutée!','SUCCESS!',
            {
                closeButton:true,
            });
      }                                 
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  };
  addEvaluationCriteriaEvent(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add new Competence
    if ((value || '').trim())
    {
      if (this.evaluation.includes(value))
      {
          this.toastr.warning('Critère déjà Ajoutée!','Attention!',
              {
                  closeButton:true,
              });
      }else
      {
        this.evaluation.push(value);
        this.toastr.success('Critère d\'évaluation Ajoutée!','SUCCESS!',
            {
                closeButton:true,
            });
      }                                 
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  };

  getGroupCompetences()
  {
      this.competenceService.getGroupCompetences()
          .subscribe(
              data=>{
                  this.groupCompetences=data;
              },
              error=>{
                  console.log(error);
              })
  }

    
  removeGRoupCompetenceEvent(groupCompetence: GroupCompetence): void {
    const index = this.groupCompetences.indexOf(groupCompetence);
    if (index >= 0) {
      this.groupCompetences.splice(index, 1);
      this.toastr.warning(`Libelle:${groupCompetence.libelle}`,'Groupe de Competence enlevée!',{
        closeButton:true,
      });
    }
  }
  removeAdmissionCriteriaEvent(critere: string): void {
    const index = this.admission.indexOf(critere);
    if (index >= 0) {
      this.admission.splice(index, 1);
      this.toastr.warning(critere,'Critere d\'admission enlevée!',{
        closeButton:true,
      });
    }
  }
  removeEvaluationCriteriaEvent(critere: string): void {
    const index = this.evaluation.indexOf(critere);
    if (index >= 0) {
      this.evaluation.splice(index, 1);
      this.toastr.warning(critere,'Critere d\'évaluation enlevée!',{
        closeButton:true,
      });
    }
  }

  AddReferentiel(){
    console.log('resultat');
    console.log(this.addRefForm.value, this.pdfFileToUpload);
    if(this.addRefForm?.valid){
    
            this.promoService.postReferentiel(this.addRefForm.value,this.pdfFileToUpload)
                .subscribe(
                    data=>{
                      this.toastr.success('REFERENTIEL AJOUTÉE!','SUCCESS!',{
                        closeButton:true,});
                        //this.resetForm();
                        console.log(data);
                    },
                    error=>{
                        console.log(error);
                    })
      console.log('c bon')
    }else{
      console.log('Pas encore')
    }
  }

  handleFileInput(event: any) {
    this.pdfFileToUpload = event.target.files?.item(0);
    console.log(this.pdfFileToUpload);
}



}
