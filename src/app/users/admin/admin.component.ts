import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../service/user/admin.service';
import { AuthServiceService } from '../../auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


  @Input() edit:string='false';
  editButton:string | undefined ='Editer'; 
  datasource: any[]=[];
  displayedColumns: string[] = ['id','photo' ,'prenom','nom','email','profil','archive','Edit','Delete'];

  constructor(
      private sanitizer:DomSanitizer,
      private authService:AuthServiceService,
      private adminService:AdminService,
      private breakpointObserver: BreakpointObserver,
      private router:Router) {}
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    email = new FormControl('', [Validators.required, Validators.email]);  
    fileToUpload: any= true;
    formGroup:any = FormGroup;

   
  
  getUsers(){
      this.adminService.getUsers()
         .subscribe(data=>{     
           console.log(data);
           this.datasource = data;
    })
  }
  transform(photo:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+ photo);
}
        
  ngOnInit(): void {
    this.getUsers();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      prenom: new FormControl('',[Validators.required]),
      nom: new FormControl('',[Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])
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

// uploadFileToActivity() {
//   this.adminService.postFile(this.fileToUpload,this.formGroup).subscribe(data => {
//       console.log(data);
//     }, error => {
//       console.log(error);
//     });
// }

onAddUser(){
  this.router.navigate(['admin/users/add']);
}

onEditUser(row:any){
  var leb = document.getElementById(row.id);
  var edit_email= document.getElementById(row.id+'_email');
  var editContentEmail = edit_email?.getAttribute('contenteditable');
  var edit_prenom= document.getElementById(row.id+'_prenom');
  var edit_nom= document.getElementById(row.id+'_nom');

  if (editContentEmail=='false') {
    if (leb && edit_email && edit_prenom && edit_nom) {
      leb.textContent="Enregistrer";
      editContentEmail='true';
      //  edit_profil.contentEditable = "true";
      //  edit_profil.setAttribute("contenteditable", "true");
      edit_prenom.contentEditable = "true";
      edit_prenom.setAttribute("contenteditable", "true");
      edit_nom.contentEditable = "true";
      edit_nom.setAttribute("contenteditable", "true");
      edit_email.contentEditable = "true";
      edit_email.setAttribute("contenteditable", "true");
     
    }
  }else{
    if (leb && edit_email && edit_prenom && edit_nom) {
      leb.textContent="Editer";
      editContentEmail='false';
      // edit_profil.contentEditable = "true";
      // edit_profil.setAttribute("contenteditable", "false");
      edit_prenom.contentEditable = "true";
      edit_prenom.setAttribute("contenteditable", "false");
      edit_nom.contentEditable = "true";
      edit_nom.setAttribute("contenteditable", "false");
      edit_email.contentEditable = "true";
      edit_email.setAttribute("contenteditable", "false");
    }
  }
}

onEditUserclose(row:any){
  //this.router.navigate(['admin/users/edit']);
}


onDeleteUser(row:any){
  //this.adminService.populateform(row);
  this.adminService.deleteUser(row)
    .subscribe(result=>{
      console.log('Suppression faite');
      this.getUsers();
      //this.router.navigate(['/admin/profils']);
    },
    error=>{
      console.log(error);
    })
}

  onAddUserProcess(){
    console.log('sss');
    this.adminService.postUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
      console.log('c bon');
    }, error => {
      console.log('pas bon');
    });
  }

  onEditserProcess(){
    console.log('sss');
    this.adminService.putUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
      console.log('c bon');
    }, error => {
      console.log('pas bon');
    });
  }
  
  loggout(){
    this.authService.deconnected();
  }

}
