import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';




@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {

  addCompetenceDisplay:boolean=false;
  listGroupCompetencesDisplay:boolean=true;
  addGroupCompetencesDisplay:boolean=true;
  listCompetencesDisplay:boolean=false;
  pourcent: string = '80%';
  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private authService: AuthServiceService,) { }

  
  

  ngOnInit() {
    
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
        map(result => result.matches),
        shareReplay() 
    );

  // ngOnInit(): void {
  // }

  loggout(){
    this.authService.deconnected();
  }
}
