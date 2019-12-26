import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/Forms';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  readonly URL_API = 'http://localhost:3000/registro';

  constructor(private http: HttpClient) { }

  postUsuario(User) {
    return this.http.post(this.URL_API, User);
  }
}
