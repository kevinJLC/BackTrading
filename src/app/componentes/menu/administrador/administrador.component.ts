import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AdministradorService } from 'src/app/servicios/administrador.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  adminData
  productoForm: FormGroup;
  categorias: string[] =
   [ 'Hogar',
     'Papelería',
     'Cocina',
     'Herramientas',
     'Deportes',
     'Entretenimiento',
     'Diversión',
     'Vestimenta',
     'Escuela'
    ]
  productos

  createFormGroup() {
    return new FormGroup({
      producto: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
  }

  constructor(private login: LoginService, private router: Router, private admin: AdministradorService) {
    this.productoForm = this.createFormGroup();
    this.adminData = login.getAuthData()
    if(this.adminData.rol!='Administrador'){
      this.router.navigate(['/cliente'])
    }
    admin.getProductos().subscribe( res => {
      this.productos = res;
      console.log(res);
    })
   }

  ngOnInit() {
  }

addProducto(form){
  if (form.valid) {
    this.admin.agregar(form.value).subscribe(res =>{
      if(res['operacion']){
        alert("Actualice la página para ver los cambios")
      }else{
        alert('No se pudo agregar el producto')
      }
    })

} else {
  alert('Formulario incompleto');
}
}

  get producto() {return this.productoForm.get('producto'); }
  get categoria() {return this.productoForm.get('categoria'); }
  get precio() { return this.productoForm.get('precio'); }
  get stock() {return this.productoForm.get('stock'); }
  get url() {return this.productoForm.get('url'); }

}
