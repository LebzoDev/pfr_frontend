import { apiURL } from "./../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient, private router:Router) {}

  login(data:any):Observable<any>{
    console.log("I am Server");
    console.log(data);
    return this.http.post(`${apiURL}login_check`,data);
  }

  connected(){
    return !!localStorage.getItem('token');
  }

  deconnected(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
