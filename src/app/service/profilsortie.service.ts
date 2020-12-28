import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { ProfilSortie } from '../modele/profil-sortie';

@Injectable({
  providedIn: 'root'
})
export class ProfilsortieService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    libelle_profil :new FormControl('',Validators.required),
    archive: new FormControl('')
  }) 

  getProfilsSortie(): Observable<ProfilSortie[]>{
    return this.http.get<ProfilSortie[]>(`${apiURL}admin/profil_sorties?archive=false`,{responseType: 'json'});
  }

  putProfilSortie(profil: ProfilSortie):Observable<ProfilSortie>{
    return this.http.put(`${apiURL}admin/profils/${profil.id}`,profil);
  }

  postProfilSortie(profilSort: ProfilSortie):Observable<ProfilSortie>{
    return this.http.post(`${apiURL}admin/profil_sorties`,profilSort);
  }

  deleteProfilSortie(profil: ProfilSortie):Observable<ProfilSortie>{
    return this.http.delete(`${apiURL}admin/profils/${profil.id}`);
  }
}
