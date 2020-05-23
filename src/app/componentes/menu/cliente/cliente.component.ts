import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  userData
  compras
  productos
  carritos
  compraActiva=false
  carritoActivo=false
  cantidadCarrito

  productoCompra
  cantidadCompra
  passCompra

  type: string;
  icon: string;

  constructor(private login: LoginService, private router: Router, private cliente: ClienteService) {
    this.userData = login.getAuthData()
    if(this.userData.rol!="Cliente"){
      this.router.navigate(['/administrador']);
    }
    cliente.getHistorial().subscribe(res =>{
      this.compras = res
      console.log(res)
    })
    cliente.getProductos().subscribe(res=>{
      this.productos = res
      console.log(res)
    })
    cliente.getCarritos().subscribe(res =>{
      this.carritos = res
      console.log(res)
    })
    this.type = 'password';
    this.icon = 'visibility_off';
   }

  ngOnInit() {

  }

  newCarrito(producto,precio,cantidad){
  const carrito = { producto: producto, precio: precio, cantidad: cantidad }
  console.log(carrito)
  this.cliente.postCarrito(carrito).subscribe(res=>{
    if(res['operacion']){
      this.cantidadCarrito=1
      window.location.reload()
    }else{
      alert("No se pudo añadir al carrito")
    }
  })

  }
  deleteCarrito(producto){
    this.cliente.deleteCarrito(producto).subscribe(res=>{
      if(res['operacion']){
        window.location.reload()
      }else{
        alert(res['message'])
      }
    })
  }
  confirmacion(producto,cantidad){
    this.compraActiva=true
    this.cantidadCompra=cantidad
    this.productoCompra=producto
    alert("Confirma tu compra antes de continuar")
  }

  compra(){
    const compra = { producto: this.productoCompra, cantidad: this.cantidadCompra, contraseña: this.passCompra }
    console.log(compra)
    this.cliente.postCompra(compra).subscribe(res=>{
      if(res['operacion']){
        window.location.reload()
      }else{
        alert(res['message'])
      }
    })

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

}
