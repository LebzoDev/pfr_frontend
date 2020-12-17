import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profil } from '../modele/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  getProfils(): Observable<Profil[]>{
    return this.http.get<Profil[]>(`${apiURL}admin/profils?page=2`,{responseType: 'json'});
  }

  postProfil(profil: Profil):Observable<Profil>{
    return this.http.post(`${apiURL}admin/profils`,profil);
  }

  putProfil(profil: Profil):Observable<Profil>{
    return this.http.put(`${apiURL}admin/profils`,profil);
  }
}
