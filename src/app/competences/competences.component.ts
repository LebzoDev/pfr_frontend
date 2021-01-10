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

  defaultDisplay:boolean=false;
  groupCompetencesDisplay:boolean=false;
  addGroupCompetencesDisplay:boolean=true;
  listCompetencesDisplay:boolean=false;
  pourcent: string = '80%';
  tabs:Array<string>=['Competence 1','Competence 2','Competence 3','Competence 4','Competence 5','Competence 6','Competence 1','Competence 2','Competence 3','Competence 4','Competence 5','Competence 6'];
  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private authService: AuthServiceService,) { }

  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
