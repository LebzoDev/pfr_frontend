import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../../service/user/admin.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../../../auth-service.service';
import { ProfilService } from 'src/app/service/profil.service';
import { Profil } from 'src/app/modele/profil';
import { Router } from '@angular/router';


interface Fabrique {
  libelle: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  profils:Profil[]=[];
  email = new FormControl('', [Validators.required, Validators.email]);  
  fileToUpload: any= true;
  formGroup:any = FormGroup;
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

  getP(){
    this.profilService.getProfils()
       .subscribe(data=>{     
         console.log(data);
         this.profils = data;
  })
}


getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }
  return this.email.hasError('email') ? 'Not a valid email' : '';
}

handleFileInput(event: any) {
  this.fileToUpload =event.files.item(0);
}
onAddUserProcess(){
  this.adminService.postUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
    console.log('c bon');
    this.router.navigate(['admin/users']);
  }, error => {
    console.log('pas bon');
  });
}

onEditserProcess(){
  this.adminService.putUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
    console.log('c bon');
  }, error => {
    console.log('pas bon');
  });
}

onClose(){
  if(confirm('Vous réellement quitter ???')){
   this.router.navigate(['admin/users'])
  }
}

}