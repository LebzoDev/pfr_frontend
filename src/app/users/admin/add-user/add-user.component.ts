import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../../service/user/admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<AddUserComponent>,private adminService:AdminService,private breakpointObserver: BreakpointObserver) {}

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
onAddUserProcess(){
  console.log('sss');
  this.adminService.postUser(this.fileToUpload,this.formGroup.value).subscribe(data => {
    console.log('c bon');
    this.dialogRef.close();
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

onClose(){
  this.dialogRef.close();
}

}
