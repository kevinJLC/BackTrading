import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../servicios/login.service';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuarios: Usuario[] = [];
  listado;

  nombre: string;
  correo: string;
  pass: string;
  fecha: Date;

  constructor(private login: LoginService) {
    this.login.getUsuarios().
    subscribe(users => {
      this.listado = users;
      console.log(this.listado);
    });
   }

  ngOnInit() {
  }




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
  }

}
