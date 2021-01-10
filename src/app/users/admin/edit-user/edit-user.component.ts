import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from 'src/app/service/user/admin.service';
import { User } from '../../../modele/user';
import { AuthServiceService } from '../../../auth-service.service';
import { Profil } from 'src/app/modele/profil';
import { ProfilService } from 'src/app/service/profil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

 
  profils:Profil[]=[];
  constructor(
      private adminService:AdminService,
      private breakpointObserver: BreakpointObserver,
      private authService:AuthServiceService,
      private profilService:ProfilService,
      private router:Router) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.initForm();
    this.getP();
  }
  getP(){
    this.profilService.getProfils()
       .subscribe(data=>{     
         console.log(data);
         this.profils = data;
  })
}

  
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      prenom: new FormControl('',[Validators.required]),
      nom: new FormControl('',[Validators.required]),
      profil:new FormControl('',[Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])
    })
  }

  loggout(){
    this.authService.deconnected();
  }

  
  email = new FormControl('', [Validators.required, Validators.email]);  
  fileToUpload: any= true;
  formGroup:any = FormGroup;

  

getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }
  return this.email.hasError('email') ? 'Not a valid email' : '';
}

handleFileInput(event: any) {
  this.fileToUpload =event.files.item(0);
}

// onEditUserProcess(){
//   //console.log(this.data);
//   this.formGroup.value.id=this.data.id;
//   //console.log(this.formGroup.value)
//   this.adminService.putUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
//     console.log('c bon');
//     //console.log(data);
//     //this.dialogRef.close();
//   }, error => {
//     console.log(error);
//     console.log('c pas bon')
//   });
// }

onEditUserProcess(){
  this.adminService.putUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
    console.log('c bon');
    //console.log(data);
    this.router.navigate(['admin/users']);
  }, error => {
    console.log(error);
    console.log('c pas bon')
  });
}

onClose(){
  if(confirm('Vous réellement quitter ???')){
   this.router.navigate(['admin/users'])
  }
}



}
