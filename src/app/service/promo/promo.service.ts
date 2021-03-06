import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { element } from 'protractor';
import { GroupCompetence } from '../competence/competence.service';

export interface Apprenant {
  id?: number,
  prenom?: string,
  nom?: string,
  username?: string,
  password?: string,
  email?: string,
  photo?: Blob,
  profil?: any,
  archive?: boolean,
  status?:string
}

export interface criteresReferentiel{
  id?:number,
  type?:string,
  libelle?:string,
  archive?:boolean
}
export interface Referentiel{
  id?: number,
  libelle?: string,
  presentation?: string,
  groupeCompetences:GroupCompetence[],
  programme?: string,
  criteres?: string,
  archive?: boolean,
  criteresReferentiels?:criteresReferentiel[]
}
export interface GrpCompetence{
  id?: number,
  libelle?: string,
  descriptif?: string,
  archive?: boolean,
}
@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private http:HttpClient) { }

  getReferentiels(): Observable<Referentiel[]>{
    return this.http.get<Referentiel[]>(`${apiURL}admin/referentiels?archive=false`,{responseType: 'json'});
  }
  getCompetences(): Observable<Referentiel[]>{
    return this.http.get<Referentiel[]>(`${apiURL}admin/competences?archive=false`,{responseType: 'json'});
  }
  getGrpCompetences(): Observable<GrpCompetence[]>{
    return this.http.get<GrpCompetence[]>(`${apiURL}admin/groupe_competences?archive=false`,{responseType: 'json'});
  }

  getApprenantAttente(): Observable<Apprenant[]>{
    return this.http.get<Apprenant[]>(`${apiURL}admin/promo/apprenants/attente`,{responseType:'json'});
  }

  putRelanceApprenant(app_attente:Apprenant):Observable<void>{
    const endpoint = `${apiURL}apprenants_relance/${app_attente.id}`;
    return this.http.put<void>(endpoint,app_attente);
  }


  postPromo(form:any,fileToUpload:any,avatar:any): Observable<any> {
    const endpoint = `${apiURL}admin/promo`;
    const formData: FormData = new FormData();
    //console.log("dddd");
    //console.log(form);
    formData.append('avatar', avatar);
    formData.append('excelFile',fileToUpload)
    formData.append('langue', form.langue);
    formData.append('titre', form.titre);
    formData.append('description', form.description);
    formData.append('lieu', form.lieu);
    formData.append('referenceAgate', form.referenceAgate);
    formData.append('idreferentiel', form.referentiel);
    formData.append('fabrique',form.fabrique);
    formData.append('dateDebut',form.dateDebut);
    formData.append('dateFin',form.dateFin);
    //console.log(formData.getAll)
    return this.http.post(endpoint, formData);

  }


  postReferentiel(form:any,fileToUpload:any): Observable<any> {
    const endpoint = `${apiURL}admin/referentiels`;
    const formData: FormData = new FormData();
    formData.append('pdfFile',fileToUpload)
    formData.append('libelle', form.libelle);
    formData.append('presentation', form.presentation);

    //Send request after appending array to formdata
    formData.append('groupCompetences', JSON.stringify(form.groupCompetences));
    formData.append('admission', JSON.stringify(form.admission));
    formData.append('evaluation',JSON.stringify(form.evaluation));
    return this.http.post(endpoint, formData);

  }


  
}
