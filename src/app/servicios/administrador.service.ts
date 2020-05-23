import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  URL_API = 'https://st0re.herokuapp.com';


  constructor(private http: HttpClient, private router: Router) { }

  agregar(producto){
    this.URL_API='https://st0re.herokuapp.com/api/productos/insertar'
    return this.http.post(this.URL_API, {producto: producto.producto, categoria: producto.categoria, precio: producto.precio, stock: producto.stock, url: producto.url})
  }
  getProductos(){
    this.URL_API='https://st0re.herokuapp.com/api/productos/listado'
    return this.http.get(this.URL_API)

  }
}
