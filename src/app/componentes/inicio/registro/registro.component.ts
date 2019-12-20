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

 /*nombre: string;
  correo: string;
  pass: string;
  fecha: Date;*/


  registroForm:FormGroup;
  correoTrue: any = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(this.correoTrue)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]), 
      fecha: new FormControl('', [Validators.required])
    });
  }
  constructor(private login: LoginService) {
    this.registroForm = this.createFormGroup();

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


    /*const newUser: Usuario = {
      id: null,
      nombre: this.nombre,
      correo: this.correo,
      contraseña: this.pass,
      nacimiento: this.fecha

    };
    // función proveniente del servicio*/
  }

  get nombre() {return this.registroForm.get('nombre'); }
  get correo() {return this.registroForm.get('correo'); }
  get pass() { return this.registroForm.get('pass')}
  get fecha() { return this.registroForm.get('fecha')}

}
