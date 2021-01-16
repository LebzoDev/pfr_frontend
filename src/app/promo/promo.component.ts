import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { PromoService, Referentiel } from '../service/promo/promo.service';
import { element } from 'protractor';
import { deserialize } from 'v8';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';


interface Langues {
  name: string;
}
interface Fabrique {
  libelle: string;
}
export interface Competence{
  id?: number,
  libelle?: string,
  descriptif?: string,
  archive?: boolean,
}

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  fileToUpload:any= File;
  autre:boolean=true;
  promoForm: any = FormGroup ;
  addPromoDisplay:boolean=false;
  addReferentielDisplay:boolean=true;
  listReferentielsDisplay:boolean=false;
  panelOpenState:boolean=true;
  referentiels : Referentiel[]=[];
  competences: Competence[]=[];
  langues: Langues[] = [
    {name: 'Anglais'},
    {name: 'Français'}
  ];
  fabriques: Fabrique[]=[
    {libelle: 'Fabrique 1'},
    {libelle: 'Fabrique 2'}
  ]
  constructor(
      private formbuild:FormBuilder,
      private promoservice:PromoService,
      private breakpointObserver: BreakpointObserver,
      private router: Router,
      private authService: AuthServiceService){ }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.initForm();
    this.getRef();
    this.getComp();
  }

  initForm(){
    this.promoForm = this.formbuild.group({
      langue: ['',[Validators.required]],
      titre: ['',[Validators.required]],
      description: ['',[Validators.required]],
      referentiel : ['', Validators.required],
      fabrique : ['', Validators.required],
      referenceAgate: ['',Validators.required],
      lieu: ['',Validators.required],
      dateDebut: ['',Validators.required],
      dateFin: ['',Validators.required],
      excelFile:[],
    })
  }

  onSelected(){
      this.autre=!this.autre;
      console.log(this.autre);
  }

  getRef(){
    this.promoservice.getReferentiels()
       .subscribe(data=>{     
           this.referentiels=data;
         //this.datasource = data;
        })
  }

  getComp(){
    this.promoservice.getCompetences()
        .subscribe(data=>{
          this.competences=data;
        })
  }

  loggout(){
    this.authService.deconnected();
  }

  title = 'dropzone';
  files: File[] = [];
  onSelect(event:any) {
      //pipe = new DatePipe('en-US');
      console.log(formatDate(this.promoForm.value.dateDebut,'yyyy-MM-dd','en-US'));
      console.log(event);
      this.files.push(...event.addedFiles);
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) { 
        formData.append("file[]", this.files[i]);
    }
  }
  addPromo(){
    if(this.promoForm.valid){
      this.promoForm.value.dateDebut=formatDate(this.promoForm.value.dateDebut,'yyyy-MM-dd','en-US');
      this.promoForm.value.dateFin=formatDate(this.promoForm.value.dateFin,'yyyy-MM-dd','en-US');
      console.log(this.promoForm?.value,this.fileToUpload,this.files[0]);
      this.promoservice.postPromo(this.promoForm.value,this.fileToUpload,this.files[0])
            .subscribe(
                  data=>{
                    console.log(data);
                  },
                  error=>{
                    console.log(error);
                  }
            )
    }
  }



  onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
  }

  // handleFileInput(files: FileList | undefined ) {
  //     this.fileToUpload = files?.item(0);
  //   console.log(this.fileToUpload);
  // }

   handleFileInput(event: any) {
      this.fileToUpload = event.target.files?.item(0);
      console.log(this.fileToUpload);
  }

}
