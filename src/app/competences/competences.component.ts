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
  listGroupCompetencesDisplay:boolean=false;
  addGroupCompetencesDisplay:boolean=false;
  listCompetencesDisplay:boolean=false;
  pourcent: string = '80%';
  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private authService: AuthServiceService,) { }

  
  

  ngOnInit() {
      this.listGroupCompetencesDisplay =true;
  }

  activate_addGroupCompetences(){
    this.listCompetencesDisplay=false;
    this.listGroupCompetencesDisplay=false;
    this.addCompetenceDisplay=false;
    this.addGroupCompetencesDisplay=true;
  }
  activate_listCompetences(){
    this.listCompetencesDisplay=true;
    this.listGroupCompetencesDisplay=false;
    this.addCompetenceDisplay=false;
    this.addGroupCompetencesDisplay=false;
  }
  activate_listGroupCompetences(){
    this.listCompetencesDisplay=false;
    this.listGroupCompetencesDisplay=true;
    this.addCompetenceDisplay=false;
    this.addGroupCompetencesDisplay=false;
  }
  activate_addCompetences(){
    this.listCompetencesDisplay=false;
    this.listGroupCompetencesDisplay=false;
    this.addCompetenceDisplay=true;
    this.addGroupCompetencesDisplay=false;
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
