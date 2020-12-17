import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {

  appareilName: string="Machine à laver";
  appareilStatus: string="Eteint";
  
  constructor() { }

  ngOnInit(): void {
  }

  getStatus(){
    return this.appareilName;
  }

}
