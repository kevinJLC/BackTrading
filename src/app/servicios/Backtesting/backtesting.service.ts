import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BacktestingService {
  readonly URL_API = 'http://backtrading.com.mx/api/backtesting';

  constructor(private http: HttpClient) { }
  postBacktesting(sistema, condicion){
    return this.http.post(this.URL_API, {sistema, condicion});
  }
}
