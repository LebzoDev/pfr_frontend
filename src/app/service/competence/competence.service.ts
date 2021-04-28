import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';
import { Competence } from '../../promo/add-promo/add-promo.component';

export interface GroupCompetence{
  id?: number,
  libelle?:string,
  descriptif?: string,
  archive?:boolean,
  competences?:Competence[]

}
@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http:HttpClient) { }

  postCompetence(competenceForm:any):Observable<Competence>{
    return this.http.post(`${apiURL}admin/competences?archive=false`,competenceForm);
  }
  postGroupCompetence(groupCompetenceForm:any):Observable<GroupCompetence>{
    return this.http.post(`${apiURL}admin/group_competences?archive=false`,groupCompetenceForm);
  }
  getCompetences(): Observable<Competence[]>{
    return this.http.get<Competence[]>(`${apiURL}admin/competences?archive=false`,{responseType: 'json'});
  }
  getOneCompetence(libelle:any): Observable<Competence[]>{
    return this.http.get<Competence[]>(`${apiURL}admin/competences?archive=false&libelle=${libelle}`,{responseType: 'json'});
  }
  getGroupCompetences(): Observable<GroupCompetence[]>{
    return this.http.get<GroupCompetence[]>(`${apiURL}admin/groupe_competences?archive=false`,{responseType: 'json'});
  }
  getOneGroupCompetence(libelle:any): Observable<Competence[]>{
    return this.http.get<Competence[]>(`${apiURL}admin/groupe_competences?archive=false&libelle=${libelle}`,{responseType: 'json'});
  }
  
}
