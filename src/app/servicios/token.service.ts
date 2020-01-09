import { Injectable } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


@Injectable()

export class TokenService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    const authToken = this.loginService.getToken();
    const authRequest = req.clone( {headers: req.headers.set('Authorization', 'Bearer ' + authToken)} );

    return next.handle(authRequest);
  }
}
