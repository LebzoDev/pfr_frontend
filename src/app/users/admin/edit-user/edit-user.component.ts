import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/user/admin.service';
import { User } from '../../../modele/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: User,private dialogRef:MatDialogRef<EditUserComponent>,private adminService:AdminService,private breakpointObserver: BreakpointObserver) {}

  email = new FormControl('', [Validators.required, Validators.email]);  
  fileToUpload: any= true;
  formGroup:any = FormGroup;

ngOnInit(): void {
  this.initForm();
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

onEditUserProcess(){
  //console.log(this.data);
  this.formGroup.value.id=this.data.id;
  //console.log(this.formGroup.value)
  this.adminService.putUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
    console.log('c bon');
    //console.log(data);
    this.dialogRef.close();
  }, error => {
    console.log(error);
    console.log('c pas bon')
  });
}

onClose(){
  this.dialogRef.close();
}


}
