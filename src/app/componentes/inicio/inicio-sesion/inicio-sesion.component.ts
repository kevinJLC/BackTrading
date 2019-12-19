import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {


  usuarios: Usuario[];

  nombre: string;
  correo: string;
  pass: string;
  fecha: Date;

  constructor(private login: LoginService) {
    this.login.getUsuarios().
    subscribe(users => {
      console.log(users);
    });
   }

  ngOnInit() {
  }

  // función sobre el evento submit
  addUser(event) {
    // para no recargar página
    event.preventDefault();
    // nuevo objeto usuario

    const newUser: Usuario = {
      id: null,
      nombre: this.nombre,
      correo: this.correo,
      contraseña: this.pass,
      nacimiento: this.fecha

    };
    // función proveniente del servicio
    this.login.postUsuario(newUser).
    subscribe(user => {
      console.log(user);
    });
  }
}
