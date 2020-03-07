import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradingautomaticoService {
  readonly URL_API = '/api/trading';
  constructor(private http: HttpClient) { }

  postTrading(formulario) {
    return this.http.post(this.URL_API, formulario);

  }
  stopTrading() {
    return this.http.get(this.URL_API);
  }

  tradingStatus() {
    return this.http.get(this.URL_API + '/status');
  }
}
