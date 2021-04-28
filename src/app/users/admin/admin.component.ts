import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../service/user/admin.service';
import { AuthServiceService } from '../../auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { User } from '../../modele/user';
import { DataServiceService } from '../../service/data-service.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface PeriodicElement {
  id:number;
  photo:Blob;
  prenom: string;
  nom:string;
  email:string;
  profil:string;
  archive:boolean;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {


  apprenant_active:boolean=false;
  profils_activate:boolean=false;
  user_active:string="";
  @Input() edit:string='false';
  editButton:string | undefined ='Editer'; 
  datasource: any[]=[];
  displayedColumns: string[] = ['select','id','photo' ,'prenom','nom','email','profil','archive','Details','Edit','Delete'];
  selection = new SelectionModel<PeriodicElement>(true, []);
  typeOfUsers: string[] = ['Utilisateurs', 'CM', 'Administrateurs', 'Apprenants', 'Formateurs'];
  seletedElement:string="";

  apprenant:User={};
  subscription:any;

  constructor(
      private sanitizer:DomSanitizer,
      private authService:AuthServiceService,
      private adminService:AdminService,
      private breakpointObserver: BreakpointObserver,
      private router:Router,
      private data: DataServiceService) {}
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(): void {
      this.getUsers();
      this.subscription = this.data.currentMessage.subscribe((apprenant:any) => this.apprenant = apprenant);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    display_details_apprenants(apprenant:any){
      if (this.apprenant_active) {
        this.data.changeApprenantDetails(apprenant)
        this.router.navigate(['admin/users/details']);
        console.log(this.apprenant_active)
      }
    }

    email = new FormControl('', [Validators.required, Validators.email]);  
    fileToUpload: any= true;
    formGroup:any = FormGroup;

   
  profils_act(user:any){
      this.user_active=user;
      this.profils_activate=true;
  }
  getUsers(){
      this.adminService.getUsers()
         .subscribe(data=>{     
           console.log(data);
           this.datasource = data;
    })
  }
  getApprenants(){
    this.apprenant_active=true;
    this.adminService.getApprenants()
    .subscribe(data=>{     
      console.log(data);
      this.datasource = data;
      })
  }
  getAdministrateurs(){
    this.apprenant_active=false;
    this.adminService.getAdministrateurs()
    .subscribe(data=>{     
      console.log(data);
      this.datasource = data;
      })
  }
  getCM(){
    this.apprenant_active=false;
    this.adminService.getCM()
    .subscribe(data=>{     
      console.log(data);
      this.datasource = data;
      })
  }
  
  getFormateurs(){
    this.apprenant_active=false;
    this.adminService.getFormateurs()
    .subscribe(data=>{     
      console.log(data);
      this.datasource = data;
      })
  }

  transform(photo:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+ photo);
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
  var edit_prenom= document.getElementById(row.id+'_prenom');
  var editContentEmail = edit_email?.getAttribute('contenteditable');

  var edit_nom= document.getElementById(row.id+'_nom');
  console.log(edit_email?.getAttribute('contenteditable'));

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datasource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  selectElement(element:any){
     console.log(element);
    if (element==="Apprenants") {
      this.getApprenants();
    }else if (element==="Administrateurs") {
      this.getAdministrateurs();
    }else if (element==="Utilisateurs") {
      this.getUsers();
    }else if (element==="CM") {
      this.getCM();
    }else if (element==="Formateurs") {
      this.getFormateurs();
    }else{
      console.log("NO");
    }
 }
}
