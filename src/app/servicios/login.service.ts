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
  readonly URL_API = 'https://st0re.herokuapp.com/api/usuario/login';

  private token: string;
  private tokenTimer: any;    // NodeJS.timer
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private intentosInicioSesion: number = 0;
  constructor(private http: HttpClient, private router: Router) { }


  // borrar esta función


  // genera un inicio de sesión con un token
  postUsuario( user) {
    return this.http.post(this.URL_API, {correo: user.email, contraseña: user.password}).subscribe(res => {
      console.log(res)
      const token = res['token'];
      const nombre = res['nombre']
      const correo = res['correo']
      const rol = res['rol']
      this.token = token;
      if (token) {
        const expiresInDuration = 3600;

        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log("La sesión expira " + expirationDate);
        this.saveAuthData(token, expirationDate, nombre, correo, rol);
        if(rol=="Cliente"){
          this.router.navigate(['/cliente']);
        }else{
          this.router.navigate(['/administrador']);
        }

      } else {
        //console.log('No se puede');
        alert('Correo o contraseña no existen');
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
    this.router.navigate(['/']);
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

  private saveAuthData(token: string, expirationDate: Date, nombre: string, correo: string, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('correo', correo);
    localStorage.setItem('rol', rol);

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('nombre');
    localStorage.removeItem('correo');
    localStorage.removeItem('rol');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const nombre = localStorage.getItem('nombre');
    const correo = localStorage.getItem('correo');
    const rol = localStorage.getItem('rol');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      nombre: nombre,
      correo: correo,
      rol: rol
    };
  }

  private setAuthTimer(duration: number) {
    console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async retardo(ms: number) {
    await this.delay(ms);
  }
  /*deleteUsuario(id) {
    return this.http.delete(`${this.domain}/usuarios/${id}`).pipe(map(res => res));
  }

  putUsuario(newUsuario: Usuario) {
    return this.http.put(`${this.domain}/usuarios/${newUsuario}`, newUsuario).pipe(map(res => res));
  }*/
}
