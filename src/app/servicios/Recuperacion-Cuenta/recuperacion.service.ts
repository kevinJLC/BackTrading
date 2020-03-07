import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecuperacionService {
  readonly URL_API = '/api/recuperar';

  constructor(private http: HttpClient) { }
  postRecuperar(correo_recuperacion) {
    return this.http.post<{value: boolean}>(this.URL_API, correo_recuperacion);
  }
}
