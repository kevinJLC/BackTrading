import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sistema } from 'src/app/sistema';

@Injectable({
  providedIn: 'root'
})
export class SistemasService {
  readonly URL_API = '/api/sistemas';

  constructor(private http: HttpClient) { }

  postSistema(sistema, condicion) {
    return this.http.post(this.URL_API, {sistema , condicion});
  }
  getSistemas() {
    return this.http.get(this.URL_API);
  }
  deleteSistema(id) {
    return this.http.delete(this.URL_API + '/' + id);
  }
  updateSistema(id, sistema, condicion) {
    return this.http.post(this.URL_API + '/update', {id, sistema, condicion});
  }
}
