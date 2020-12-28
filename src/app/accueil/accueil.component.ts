import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../interface/menu-item';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  panelOpenState = false;
  menuItems : MenuItem[]= [
    {
      label: 'Login',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'YOUTUBE',
      icon: 'slideshow',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'A Propos',
      icon: 'help',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    }
  ];
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  authentification(){
    this.route.navigate(['/login']);
  }

}
