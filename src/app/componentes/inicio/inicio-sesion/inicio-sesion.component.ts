import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../servicios/login.service';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {


  listado;

  loginForm: FormGroup;
  correoTrue: any = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.correoTrue)]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }


  constructor(private login: LoginService) {
    this.loginForm = this.createFormGroup();
   }



  ngOnInit() {
  }

  onLogin(formulario: FormGroup) {
    if (this.loginForm.valid) {
      console.log('hola');
      this.onReset();
    } else {
      console.log('campos invalido');
    }

  }
  onReset() {
    this.loginForm.reset();
  }
  // función sobre el evento submit


  get email() {return this.loginForm.get('email'); }
  get password() {return this.loginForm.get('password'); }
}
