import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../servicios/login.service';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from 'src/app/usuario';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit, OnDestroy {


  userAuntentificado = false;
  inicio: string = '/';
  cargando: boolean = false;
  private authListenerSubs: Subscription;

  private token: string;
  loginForm: FormGroup;
  correoTrue: any = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.correoTrue)]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }


  constructor(private login: LoginService, private router: Router) {
    this.loginForm = this.createFormGroup();
   }



  ngOnInit() {
    this.userAuntentificado = this.login.getAuthentication();
    this.authListenerSubs = this.login.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userAuntentificado = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogin(form: FormGroup) {
    if (form.valid) {
      this.cargando = true;
      this.login.postUsuario(form.value);
      this.loginForm.reset();
      this.cargando = false;
    } else {
      alert('complete el formulario');
    }
  }

  onLogout() {
    this.login.logout();
  }

  hola(){
    console.log('holas desde recuperar cuenta');
  }
  recuperarCuenta() {
    this.router.navigate(['/recuperacion']);
  }

  get email() {return this.loginForm.get('email'); }
  get password() {return this.loginForm.get('password'); }



}
