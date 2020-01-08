import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  pswForm: FormGroup;
  type: string;
  icon: string;
  actualizado = false;
  verificado = true;


  createFormGroup() {
    return new FormGroup({
      actualPsw: new FormControl('', [Validators.required]),
      newPsw: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
    });
  }


  constructor() {
    this.type = 'password';
    this.icon = 'visibility_off';
    this.pswForm = this.createFormGroup();
   }

  ngOnInit() {
  }

  cambiaPsw() {

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

  get actualPsw()  {return this.pswForm.get('actualPsw'); }
  get newPsw() { return this.pswForm.get('newPsw'); }

}
