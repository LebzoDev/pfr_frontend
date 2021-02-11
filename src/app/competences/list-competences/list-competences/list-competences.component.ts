import { Component, OnInit } from '@angular/core';
import { Competence } from '../../../promo/add-promo/add-promo.component';
import { CompetenceService, GroupCompetence } from 'src/app/service/competence/competence.service';

@Component({
  selector: 'app-list-competences',
  templateUrl: './list-competences.component.html',
  styleUrls: ['./list-competences.component.css']
})
export class ListCompetencesComponent implements OnInit {

  competences:Competence[]=[];
  groupCompetences:GroupCompetence[]=[];
  value_grpcpm:Competence={};
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
  constructor(private competenceService:CompetenceService) { }

  ngOnInit(): void {
    this.getGroupComp();
  }

  getThosesCompetences(competences:any){
    if(typeof(competences)=="object"){
      console.log(typeof(competences));
      this.competences=competences;
      console.log(competences);
    }
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


  getComp(){
    this.competenceService.getCompetences()
      .subscribe(data=>{
        this.competences=data;
      },
      error=>{
          console.log("errror");
          console.log(error);
      }
  )}

  getGroupComp(){
    this.competenceService.getGroupCompetences()
      .subscribe(data=>{
        this.groupCompetences=data;
      },
      error=>{
          console.log("errror");
          console.log(error);
      }
  )}


}
