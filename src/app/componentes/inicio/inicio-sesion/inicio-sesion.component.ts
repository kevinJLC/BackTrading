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

  borra: string;
  usuarios: Usuario[];
  nombre: string;
  correo: string;
  pass: string;
  fecha: Date;

  constructor(private login: LoginService) {
    this.login.getUsuarios().
    subscribe(users => {
      this.usuarios = users;
      console.log(this.usuarios);
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
      nombre: this.nombre,
      correo: this.correo,
      contraseña: this.pass,
      nacimiento: this.fecha
    };

    console.log(newUser.nombre);
    console.log(newUser.correo);
    console.log(newUser.contraseña);
    console.log(newUser.nacimiento);

    // función proveniente del servicio
    this.login.postUsuario(newUser).subscribe(users => {
      this.usuarios.push(newUser);
      console.log(this.usuarios);
    });
  }

}
