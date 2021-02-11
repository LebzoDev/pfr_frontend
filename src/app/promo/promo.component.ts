import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  autre:boolean=true;
  listPrmomoDisplay:boolean=false;
  addPromoDisplay:boolean=false;
  addReferentielDisplay:boolean=false;
  listReferentielsDisplay:boolean=false;
 


  constructor(
    
      private breakpointObserver: BreakpointObserver,
      private router: Router,
      private authService: AuthServiceService){ }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.addPromoDisplay=true;
  }

 

  onSelected(){
      this.autre=!this.autre;
      console.log(this.autre);
  }

  active_addPromo(){
    this.addPromoDisplay=true;
    this.addReferentielDisplay=false;
    this.listReferentielsDisplay=false;
    this.listPrmomoDisplay=false;
  }

  active_addReferentiel(){
    this.addPromoDisplay=false;
    this.addReferentielDisplay=true;
    this.listReferentielsDisplay=false;
    this.listPrmomoDisplay=false;
  }

  active_listReferentiels(){
    this.addPromoDisplay=false;
    this.addReferentielDisplay=false;
    this.listReferentielsDisplay=true;
    this.listPrmomoDisplay=false;
  }

  active_listPromo(){
    this.listPrmomoDisplay=true;
    this.addPromoDisplay=false;
    this.addReferentielDisplay=false;
    this.listReferentielsDisplay=false;
  }

  loggout(){
    this.authService.deconnected();
  }






  // handleFileInput(files: FileList | undefined ) {
  //     this.fileToUpload = files?.item(0);
  //   console.log(this.fileToUpload);
  // }

}
