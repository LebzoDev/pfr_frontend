import { Component, OnInit } from '@angular/core';
import { PromoService, Referentiel } from 'src/app/service/promo/promo.service';

@Component({
  selector: 'app-list-referentiels',
  templateUrl: './list-referentiels.component.html',
  styleUrls: ['./list-referentiels.component.css']
})
export class ListReferentielsComponent implements OnInit {

  referentiels:Referentiel[]=[];
  constructor(private promoservice:PromoService) { }

  ngOnInit(): void {
    this.getReferentiels();
  }

  getReferentiels(){
      this.promoservice.getReferentiels()
        .subscribe(data=>
          {
            this.referentiels=data;
            console.log(this.referentiels[3].groupeCompetences)
          },
          error=>{
            console.log(error);
          })
  }

}
