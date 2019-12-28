import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SistemasService {
  readonly URL_API = 'http://localhost:3000/sistemas';

  constructor(private http: HttpClient) { }

  postSistema(sistema) {
    return this.http.post(this.URL_API, sistema);
  }
  getSistemas() {
    return this.http.get(this.URL_API);
  }
}
