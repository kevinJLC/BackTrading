import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModousuarioService {

  private modoUser$ = new Subject<string>();



  constructor() { }
  actualizarModoUser(modo: string) {
    this.modoUser$.next(modo);
  }
  getModoUser$(): Observable<string>{
    return this.modoUser$.asObservable();
  }

}
