import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private logService:LogService, private router:Router) { }

  ngOnInit() {
  }

  sesionValida():boolean{
    return this.logService.sesionValida();
  }

  desconectar(){
    this.logService.cerrarSesion();
    this.router.navigate(['/movies'])
  }

}
