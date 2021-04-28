import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CompetenceService } from 'src/app/service/competence/competence.service';
import { Competence } from '../../../promo/add-promo/add-promo.component';


export interface GroupCompetence{
  id?: number,
  libelle?:string,
  descriptif?: string,
  archive?:boolean,
  competences?:Competence[],
}

@Component({
  selector: 'app-list-group-competences',
  templateUrl: './list-group-competences.component.html',
  styleUrls: ['./list-group-competences.component.css']
})
export class ListGroupCompetencesComponent implements OnInit {

  control = new FormControl();
  groupCompetences:GroupCompetence[]=[];
  filteredStreets: Observable<string[]> | undefined;
  indexTS:number=0;
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];

  constructor(
      private competenceService:CompetenceService,) { }

  ngOnInit(): void {
    this.getGroupComp();
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  modifyGroupComp(grpComp:any){
    if(confirm("Modifier la groupe de competence ?")){
      console.log('Modification');
      console.log(grpComp);
    }
  }

  deleteGroupComp(grpComp:any){
      if(confirm("Archiver cette groupe de competence ?")) {
          console.log("Suppression");
          console.log(grpComp);
      }
  }

  getGroupComp(){
      this.competenceService.getGroupCompetences()
          .subscribe(
              data=>{
                  this.groupCompetences= data;
              },
              error=>{
                  console.log(error);
              }
          )
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
