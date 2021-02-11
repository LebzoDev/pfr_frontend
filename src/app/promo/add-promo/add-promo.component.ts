import { Component, OnInit } from '@angular/core';
import { PromoService,Referentiel } from '../../service/promo/promo.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {

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
    private formbuild:FormBuilder,
    private promoservice:PromoService
    ) { }

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

  getComp(){
    this.promoservice.getCompetences()
        .subscribe(data=>{
          this.competences=data;
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
