import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import jwt_decode from "jwt-decode";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup:any = FormGroup;
  
  constructor(private authService:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  
  loginProcess(){
       if (this.formGroup.valid) {
          this.authService.login(this.formGroup.value).subscribe(result=>{
              if(result.token){
              localStorage.setItem('token',result.token);  
              let decoded : any = jwt_decode(result.token);
              if(!decoded.archive)
              {
                  this.router.navigate(['/admin/profils']);
              }else
              {
                  this.authService.deconnected();
              }
           }
         },
         error=>{
           console.log(error);
           this.router.navigate(['/login']);
          })
       }
  }

} 
