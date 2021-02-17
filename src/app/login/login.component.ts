import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { decode } from 'punycode';
import { AdminService } from 'src/app/service/user/admin.service';
import { Apprenant } from '../service/promo/promo.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup:any = FormGroup;
  apprenant:Apprenant={};
  
  constructor(
      private adminService:AdminService,
      private authService:AuthServiceService,
      private router: Router,
      private toastr:ToastrService) { }

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
              if(decoded.roles[0]=='ROLE_APPRENANT' && !decoded.archive && (decoded.status=='attente')){
                    this.activate_apprenant(decoded.id);
              }else{
              if(!decoded.archive)
              {
                  this.router.navigate(['/admin/profils']);
              }else
              { 
                this.toastr.error("Login ou Mot de passe Incorrect","Veuillez reverifier !!!!");
                this.authService.deconnected();
              }
            }
           }
         },
         error=>{
           console.log(error);
           this.router.navigate(['/login']);
           this.toastr.error("Login ou Mot de passe Incorrect","Veuillez reverifier !!!!");
          })
       }else{
         var username_ = document.getElementById("username_");
         let password_ = document.getElementById("password_");
         var login = (document.getElementById("login") as HTMLInputElement)?.value;
         var pwd = (document.getElementById("pwd") as HTMLInputElement)?.value;
        if (login==="" && username_) {
            username_.textContent ="Champ *Obligatoire";
            username_?.setAttribute("style","color:red;font-weight:lighter;font-size:1vw;");
        }
        if (pwd==="" && password_ ){
          password_.textContent ="Champ *Obligatoire";
          password_?.setAttribute("style","color:red;font-weight:lighter;font-size:1vw;");
        }
       }
  }

  activate_apprenant(id:number){
      this.adminService.getApprenant(id)
          .subscribe(data=>{
              this.apprenant=data;
              this.apprenant.status='active';
              //console.log(this.apprenant);
              this.adminService.putActivateApprenant(this.apprenant)
                  .subscribe(data_update=>
                        {
                          console.log(data_update);
                          //console.log(data_update);
                         
                        })
          })
  }

  initErrorFormulaire(){
    var username_ = document.getElementById("username_");
    let password_ = document.getElementById("password_");
    if (username_?.textContent) {
      username_.textContent="";
    }
    if (password_?.textContent) {
      password_.textContent="";
    }
  }

} 
