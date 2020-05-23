import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { RegistroService } from '../../../servicios/registro.service';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  toppingList: string[] =
   [ 'Cliente',
     'Administrador',
    ]


 /*nombre: string;
  correo: string;
  pass: string;
  fecha: Date;*/
  type: string;
  icon: string;


  registroForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  correoTrue: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(this.correoTrue)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
      rol: new FormControl('', [Validators.required]),
    });
  }
  constructor(public registro: RegistroService ) {
    this.type = 'password';
    this.icon = 'visibility_off';
    this.registroForm = this.createFormGroup();
   }

  ngOnInit() {
  }




  addUser(form) {
    if (form.valid) {
        this.registro.postUsuario(form.value).subscribe(res => {
          console.log(res);
          if (res['operacion']) {
            alert('Registrado con éxito');
          } else {
            alert('El correo ya está en uso');
          }
        });

    } else {
      alert('Formulario incompleto');
    }

  }

  muestra() {
    if (this.type === 'password') {
      this.type = 'text';
      this.icon = 'visibility';
    } else if (this.type === 'text') {
      this.type = 'password';
      this.icon = 'visibility_off';
    }
  }

  get nombre() {return this.registroForm.get('nombre'); }
  get correo() {return this.registroForm.get('correo'); }
  get pass()   {return this.registroForm.get('pass'); }
  get rol()  {return this.registroForm.get('rol'); }

  // Función para visibilidad de contraseña

}
