import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  readonly URL_API = '/api/registro';

  constructor(private http: HttpClient) { }

  postUsuario(User) {
    return this.http.post(this.URL_API, User);
  }
}
