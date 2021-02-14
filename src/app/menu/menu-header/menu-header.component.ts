import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  constructor(
    private authService:AuthServiceService
  ) { }

  ngOnInit(): void {
  }

  loggout(){
    this.authService.deconnected();
  }


}
