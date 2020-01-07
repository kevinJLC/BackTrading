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

  usuarios: Usuario[] = [];
  user: Usuario = {
    id: '',
    nombre: 'sos12345',
    correo: 'sos@gmail.com',
    contraseña: 'asdasdas',
    nacimiento: new Date()


  };
  listado;
  mayor_edad=true;

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
      fecha: new FormControl('', [Validators.required])
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
    const año = parseInt(form.value.fecha.split('-')[0]);
    const mes = parseInt(form.value.fecha.split('-')[1])-1; // 0 = Ene y 11 = Dic
    const dia = parseInt(form.value.fecha.split('-')[2]);

    const fechaDate = new Date(año, mes, dia);
    const now = new Date();
    if (fechaDate.getUTCFullYear() + 18 < now.getUTCFullYear()) {
        form.value.fecha = new Date(año, mes, dia);
        this.registro.postUsuario(form.value).subscribe(res => {
          console.log(res);
          if (res===true) {
            alert('El correo está en uso');
          } else {
            alert('Ve a tu correo y verifica tu cuenta');
          }
        });
    } else {
        this.mayor_edad = false;
    }



    } else {
      alert('Formulario incompleto');

      this.registroForm.reset();
    }

  }

  fechaValida() {
    this.mayor_edad = true;
  }

  get nombre() {return this.registroForm.get('nombre'); }
  get correo() {return this.registroForm.get('correo'); }
  get pass()   {return this.registroForm.get('pass'); }
  get fecha()  {return this.registroForm.get('fecha'); }

  // Función para visibilidad de contraseña
  muestra() {
    if (this.type === 'password') {
      this.type = 'text';
      this.icon = 'visibility';
    } else if (this.type === 'text') {
      this.type = 'password';
      this.icon = 'visibility_off';
    }
  }
}
