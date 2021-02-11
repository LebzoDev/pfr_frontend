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
