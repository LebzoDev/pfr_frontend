import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profil } from '../modele/profil';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Profilgiven{
  libelle?:string
}
@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    libelle :new FormControl('',Validators.required),
    archive: new FormControl('')
  }) 
  getProfils(): Observable<Profil[]>{
    return this.http.get<Profil[]>(`${apiURL}admin/profils?archive=false`,{responseType: 'json'});
  }

  postProfil(profil: Profilgiven):Observable<Profil>{
    return this.http.post(`${apiURL}admin/profils`,profil);
  }

  putProfil(profil: Profil):Observable<Profil>{
    return this.http.put(`${apiURL}admin/profils/${profil.id}`,profil);
  }

  deleteProfil(profil: Profil):Observable<Profil>{
    return this.http.delete(`${apiURL}admin/profils/${profil.id}`);
  }

  populateform(profil:any){
    return this.form.setValue(profil);
  }
}
