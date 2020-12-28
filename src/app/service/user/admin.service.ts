import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private handleError:HttpHandler) { }


  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${apiURL}admin/users?archive=false`,{responseType: 'json'});
  }

  deleteUser(user: any):Observable<any>{
    return this.http.delete(`${apiURL}admin/users/${user.id}`);
  }


  postUser(fileToUpload:any,form:any): Observable<any> {
    const endpoint = `${apiURL}admin/users`;
    const formData: FormData = new FormData();
    //console.log("dddd");
    //console.log(form);
    formData.append('photo', fileToUpload);
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('prenom', form.prenom);
    formData.append('nom', form.nom);
    formData.append('email', form.email);
    formData.append('id', '21');
  
    return this.http.post(endpoint, formData);

  }

  putUser(fileToUpload:any,form:any): Observable<any> {
    const endpoint = `${apiURL}admin/users/${form.id}`;
    const formData: FormData = new FormData();
    console.log(`${apiURL}admin/users/${form.id}`);
   
    formData.append('photo', fileToUpload);
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('prenom', form.prenom);
    formData.append('nom', form.nom);
    formData.append('email', form.email);
    formData.append('id', '21');
    console.log(formData);
  
    return this.http.put(endpoint, formData);

  }
}