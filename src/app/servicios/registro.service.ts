import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  readonly URL_API = 'https://st0re.herokuapp.com/api/usuario/registro';

  constructor(private http: HttpClient) { }
  
  postUsuario(user) {
    return this.http.post(this.URL_API, {nombre: user.nombre, correo: user.correo, contraseña: user.pass, rol: user.rol});
  }
}
