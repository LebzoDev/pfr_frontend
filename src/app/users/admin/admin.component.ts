import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../service/user/admin.service';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthServiceService } from '../../auth-service.service';
import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private sanitizer:DomSanitizer,private authService:AuthServiceService,private adminService:AdminService,private breakpointObserver: BreakpointObserver,private dialog:MatDialog) {}
  datasource: any[]=[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    email = new FormControl('', [Validators.required, Validators.email]);  
    fileToUpload: any= true;
    formGroup:any = FormGroup;

   
  displayedColumns: string[] = ['id','photo' ,'prenom','nom','email','profil','archive','Edit','Delete'];

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
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%"
  console.log(this.formGroup.value);
  this.dialog.open(AddUserComponent ,dialogConfig)
   .afterClosed().subscribe(()=>this.getUsers());
}

onEditUser(row:any){
  //this.adminService.populateform(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  dialogConfig.data={id: row.id,prenom: row.prenom,nom:row.nom,username:row.username,password:row.password,email:row.email,photo:row.photo};
  this.dialog.open(EditUserComponent, dialogConfig)
  .afterClosed().subscribe(()=>this.getUsers());
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
