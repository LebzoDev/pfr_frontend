import { Component, OnInit } from '@angular/core';
import { Apprenant, PromoService,Referentiel } from '../../service/promo/promo.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { element } from 'protractor';
import { deserialize } from 'v8';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


interface Langues {
  name: string;
}
interface Fabrique {
  libelle: string;
}
export interface Niveau{
  id?: number,
  libelle?: string,
  critereDevaluation?:string,
  groupDactions?:string
}
export interface Competence{
  id?: number,
  libelle?: string,
  descriptif?: string,
  archive?: boolean,
  niveaux?:Niveau[]
}


@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {

  apprenants_attente:Apprenant[]=[];
  promoForm: any = FormGroup ;
  fileToUpload:any= File;
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
    private toastr:ToastrService,
    private formbuild:FormBuilder,
    private promoservice:PromoService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getRef();
    this.getComp();
    this.getApprenantAttente();
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

  getRef(){
    this.promoservice.getReferentiels()
       .subscribe(data=>{     
           this.referentiels=data;
         //this.datasource = data;
        })
  }

  getApprenantAttente(){
      this.promoservice.getApprenantAttente()
          .subscribe(data=>{
              this.apprenants_attente=data;
          })
  }

  getComp(){
    this.promoservice.getCompetences()
        .subscribe(data=>{
          this.competences=data;
        })
  }

  relance_mail(app_attente:Apprenant){
      this.promoservice.putRelanceApprenant(app_attente)
        .subscribe(data=>{
              this.toastr.success('Le message de relance a été envoyé','SUCCESS',{
                timeOut:3000,progressBar:true,closeButton:true
              })
        },
        error=>{
              this.toastr.warning('Le message de relance a échoué','FAILED',{
                timeOut:5000,progressBar:true
              })
        })
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

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
}

handleFileInput(event: any) {
  this.fileToUpload = event.target.files?.item(0);
  console.log(this.fileToUpload);
}


}
