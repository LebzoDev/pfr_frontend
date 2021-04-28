import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromoService } from 'src/app/service/promo/promo.service';
import { CompetenceService } from '../../service/competence/competence.service';


export interface Competence{
  id?: number,
  libelle?: string,
  descriptif?: string,
  archive?: boolean,
}


@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css']
})
export class AddCompetenceComponent implements OnInit {

  niveau1:boolean=true;
  niveau2:boolean=false;
  niveau3:boolean=false;
  libelle1:string="";
  libelle2:string="";
  libelle3:string="";
  critereDev1:string="";
  critereDev2:string="";
  critereDev3:string="";
  groupDac1:string="";
  groupDac2:string="";
  groupDac3:string="";
  checked:boolean=false;
  manyCompetences:boolean=false;
  grpcompetences: Competence[]=[];
  addCompetenceForm: any = FormGroup;
  constructor(
    private formbuild:FormBuilder,
    private promoservice:PromoService,
    private competenceService:CompetenceService) { }

  ngOnInit(): void {
    this.initForm();
    this.getGrpComp();
  }

  initForm(){
    this.addCompetenceForm = this.formbuild.group({
      idgroupcompetence: ['',[Validators.required]],
      libelle: ['', [Validators.required]],
      libelle1: ['', [Validators.required]],
      libelle2: ['', [Validators.required]],
      libelle3: ['', [Validators.required]],
      descriptif : ['',[Validators.required]],
      critereDev1: ['',[Validators.required]],
      critereDev2: ['',[Validators.required]],
      critereDev3: ['',[Validators.required]],
      groupDac1: ['',[Validators.required]],
      groupDac2: ['',[Validators.required]],
      groupDac3: ['',[Validators.required]]
    })
  }

  niveau1_Activate(){
    this.niveau1=true;
    this.niveau2 =false;
    this.niveau3=false;
  }
  niveau2_Activate(){
    this.niveau2=true;
    this.niveau1 =false;
    this.niveau3=false;
  }
  niveau3_Activate(){
    this.niveau3=true;
    this.niveau1 =false;
    this.niveau2=false;
  }

  getGrpComp(){
    this.promoservice.getGrpCompetences()
        .subscribe(data=>{
          console.log(data)
          this.grpcompetences=data;
        })
  }

  addCompetence(){
      console.log(this.addCompetenceForm.value)
      if(this.addCompetenceForm?.valid){
        console.log(this.addCompetenceForm.value);
        this.competenceService.postCompetence(this.addCompetenceForm.value)
          .subscribe(
            data=>{
              console.log('c bon');
                console.log(data);
            },
            error=>{
              console.log(error)
              console.log('c pas bon');
            })
      }else{
        console.log('c pas bon invalide');
      }
  }

}
