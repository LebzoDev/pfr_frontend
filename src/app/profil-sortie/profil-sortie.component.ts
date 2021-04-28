import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { ProfilsortieService } from '../service/profilsortie.service';
import { ProfilSortie } from '../modele/profil-sortie';

@Component({
  selector: 'app-profil-sortie',
  templateUrl: './profil-sortie.component.html',
  styleUrls: ['./profil-sortie.component.css']
})
export class ProfilSortieComponent implements OnInit {

  datasource: ProfilSortie[]=[];
  pourcent: string = '80%';
  addProfilSortie:boolean=false;
  editProfilSortie:boolean=false;
  editDataSend:ProfilSortie=new ProfilSortie();
  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private authService: AuthServiceService,private profSortieService:
    ProfilsortieService) { }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.getProfSortie();
  }

  displayedColumns: string[] = ['id', 'libelle_profil', 'archive','Edit','Delete','Details'];

  getProfSortie(){
      this.profSortieService.getProfilsSortie()
         .subscribe(data=>{     
           console.log(data);
           this.datasource = data;
    })
  }

  onCreateProfilSortie(){
    this.addProfilSortie = true;
    console.log(this.addProfilSortie);
 }

 onEditProfilSortie(row:any){
  this.editProfilSortie = true;
  this.editDataSend =  row;
  console.log(row);
}

onDeleteProfilSortie(row:any){

  this.profSortieService.deleteProfilSortie(row)
    .subscribe(result=>{
      console.log('Suppression faite');
      this.getProfSortie();
      //this.router.navigate(['/admin/profils']);
    },
    error=>{
      console.log(error);
    })
}

 onAddClosed(){
  this.addProfilSortie=false;
  this.getProfSortie();
}

onEditClosed(){
  this.editProfilSortie=false;
  this.getProfSortie();
}
  

  loggout(){
    this.authService.deconnected();
  }

}
