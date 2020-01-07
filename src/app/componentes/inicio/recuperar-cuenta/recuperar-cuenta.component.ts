import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.css']
})
export class RecuperarCuentaComponent implements OnInit {
  recuperacionForm: FormGroup;
  encontrado = true;
  auxEncontrado = false;
  correoTrue: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  createFormGroup() {
    return new FormGroup({
      correoRecuperacion: new FormControl('', [Validators.required, Validators.pattern(this.correoTrue)]),
    });
  }


  constructor(private router: Router) {
    this.recuperacionForm = this.createFormGroup();
   }
  ngOnInit() {
  }

  recuperarCuenta(form) {

  }

  goHome() {
    this.router.navigate(['/']);
  }

  get correoRecuperacion() {return this.recuperacionForm.get('correoRecuperacion'); }
}
