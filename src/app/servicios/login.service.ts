import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../usuario';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly URL_API = 'http://localhost:3000/login';

  private token: string;
  private tokenTimer: any;    // NodeJS.timer
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router) { }


  //borrar esta función
  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  // genera un inicio de sesión con un token
  postUsuario( user) {
    return this.http.post<{token: string, expiresIn: number}>(this.URL_API, user).subscribe(res => {
      const token = res.token;
      this.token = token;
      if (token) {
        const expiresInDuration = res.expiresIn;

        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/sistemas']);
      } else {
        this.router.navigate(['/']);
      }

    });
  }
  // cierra sesión y poene el token en null
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthentication( ) {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return ;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  private setAuthTimer(duration: number) {
    console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);

  }
  /*deleteUsuario(id) {
    return this.http.delete(`${this.domain}/usuarios/${id}`).pipe(map(res => res));
  }

  putUsuario(newUsuario: Usuario) {
    return this.http.put(`${this.domain}/usuarios/${newUsuario}`, newUsuario).pipe(map(res => res));
  }*/
}
