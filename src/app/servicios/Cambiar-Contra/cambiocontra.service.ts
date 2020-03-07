import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CambiocontraService {
  readonly URL_API = '/api/updatepass';

  constructor(private http: HttpClient) { }
  postCambiaContra(nowContra, newContra) {
    return this.http.post(this.URL_API, {nowContra, newContra});
  }
}
