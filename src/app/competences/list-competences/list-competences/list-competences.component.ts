import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-competences',
  templateUrl: './list-competences.component.html',
  styleUrls: ['./list-competences.component.css']
})
export class ListCompetencesComponent implements OnInit {

  tabs:Array<string>=['Competence 1','Competence 2','Competence 3','Competence 4','Competence 5','Competence 6','Competence 1','Competence 2','Competence 3','Competence 4','Competence 5','Competence 6'];
  constructor() { }

  ngOnInit(): void {
  }

}
