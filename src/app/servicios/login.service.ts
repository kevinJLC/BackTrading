import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  domain = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>( `${this.domain}/usuarios`).pipe(map(res => res));
  }

  postUsuario( newUsuario: Usuario) {
    return this.http.post(`${this.domain}/usuarios`, newUsuario).pipe(map(res => res));
  }

  deleteUsuario(id) {
    return this.http.delete(`${this.domain}/usuarios/${id}`).pipe(map(res => res));
  }

  putUsuario(newUsuario) {
    return this.http.put(`${this.domain}/usuarios/${newUsuario.id}`, newUsuario).pipe(map(res=>res));
  }
}
