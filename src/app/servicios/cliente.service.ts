import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  URL_API = 'https://st0re.herokuapp.com';

  constructor(private http: HttpClient) { }



  getHistorial(){
    this.URL_API='https://st0re.herokuapp.com/api/usuario/historial'
    return this.http.get(this.URL_API)
  }

  getProductos(){
    this.URL_API='https://st0re.herokuapp.com/api/productos/listado'
    return this.http.get(this.URL_API)
  }

  getCarritos(){
    this.URL_API='https://st0re.herokuapp.com/api/usuario/carrito'
    return this.http.get(this.URL_API)
  }

  postCarrito(producto){
    this.URL_API='https://st0re.herokuapp.com/api/productos/semicompra'
    return this.http.post(this.URL_API, {producto: producto.producto, precio: producto.precio, cantidad: producto.cantidad})
  }

  postCompra(producto){
    this.URL_API='https://st0re.herokuapp.com/api/productos/comprar'
    return this.http.post(this.URL_API, {producto: producto.producto, cantidad: producto.cantidad, contraseña: producto.contraseña})
  }

  deleteCarrito(producto){
    this.URL_API='https://st0re.herokuapp.com/api/usuario/deletecarrito'
    return this.http.post(this.URL_API, {producto: producto})
  }

}
