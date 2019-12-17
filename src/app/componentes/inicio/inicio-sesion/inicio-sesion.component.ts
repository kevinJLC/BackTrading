import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {


  constructor(private login: LoginService) {
    this.login.getUsuarios().
    subscribe(users => {
      console.log(users);
    });
   }

  ngOnInit() {
  }

}
