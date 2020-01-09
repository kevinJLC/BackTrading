import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperacionService } from 'src/app/servicios/Recuperacion-Cuenta/recuperacion.service';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.css']
})

export class RecuperarCuentaComponent implements OnInit {
  recuperacionForm: FormGroup;
  encontrado = true;
  auxEncontrado = false;
  // tslint:disable-next-line: max-line-length
  correoTrue: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  createFormGroup() {
    return new FormGroup({
      correoRecuperacion: new FormControl('', [Validators.required, Validators.pattern(this.correoTrue)]),
    });
  }


  constructor(private router: Router, private recuperacion: RecuperacionService) {
    this.recuperacionForm = this.createFormGroup();

   }
  ngOnInit() {
  }

  recuperarCuenta(form) {
    if(form.value.correoRecuperacion.length == 0){
      this.encontrado = false;
    }
    this.recuperacion.postRecuperar(form.value).subscribe(res => {
      if(res){
        this.auxEncontrado = true;
        this.encontrado = true;
      }
      else{
        this.auxEncontrado = false;
        this.encontrado = false;
      }

      console.log(res);
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  get correoRecuperacion() {return this.recuperacionForm.get('correoRecuperacion'); }
}
