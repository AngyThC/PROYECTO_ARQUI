import { Component, OnInit } from '@angular/core';
import navigationM from '../../../data/navigationMesero.json';


@Component({
  selector: 'app-sidenav-mesero',
  templateUrl: './sidenav-mesero.component.html',
  styleUrls: ['./sidenav-mesero.component.css']
})
export class SidenavMeseroComponent implements OnInit {

  constructor() { }

  public navlist = navigationM;

  navToggle = () => {
    document.getElementById('body').classList.toggle('ms-aside-left-open');
    document.getElementById('ms-side-nav').classList.toggle('ms-aside-open');
    document.getElementById('overlayleft').classList.toggle('d-block');
  }

  preventNavigation(event: Event) {
    event.preventDefault();
}


  ngOnInit(): void {
  }
}
