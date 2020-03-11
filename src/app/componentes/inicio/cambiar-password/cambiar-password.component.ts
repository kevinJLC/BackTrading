import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CambiocontraService } from 'src/app/servicios/Cambiar-Contra/cambiocontra.service';

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
  confirmacion = "";


  createFormGroup() {
    return new FormGroup({
      actualPsw: new FormControl('', [Validators.required]),
      newPsw: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
      confirmPsw: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)])
    });
  }


  constructor(private router: Router, private cambiarContra: CambiocontraService) {
    this.type = 'password';
    this.icon = 'visibility_off';
    this.pswForm = this.createFormGroup();
   }

  ngOnInit() {
  }

  cambiaPsw(form) {
    if(!form.valid || form.value.confirmPsw === "" || form.value.confirmPsw !== form.value.newPsw){
      alert("Campos invalidos");
      console.log(form.value.newPsw);
      return;
    }
    else{
      this.cambiarContra.postCambiaContra(form.value.actualPsw, form.value.newPsw).subscribe(res =>{
          if(res){
            this.actualizado = true;
            this.verificado = true;
          }
          else{
            this.actualizado = false;
            this.verificado = false;
          }
      });
    }
  }

cancelar(){
  this.router.navigate(["/sistemas"])
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
  get confirmPsw() { return this.pswForm.get('confirmPsw'); }

}
