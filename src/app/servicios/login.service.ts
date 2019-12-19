import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly URL_API = 'http://localhost:3000';
  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  getUsuarios() {
    return this.http.get( this.URL_API);
  }

  postUsuario(newUsuario: Usuario) {
    return this.http.post(this.URL_API, newUsuario);
  }

  deleteUsuario(id) {
    return this.http.delete(`${this.domain}/usuarios/${id}`).pipe(map(res => res));
  }

  putUsuario(newUsuario: Usuario) {
    return this.http.put(`${this.domain}/usuarios/${newUsuario}`, newUsuario).pipe(map(res => res));
  }
}
