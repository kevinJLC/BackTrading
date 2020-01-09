import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
@Injectable()
export class AuthenticatedGuardService implements CanActivate {

  constructor( private login: LoginService, private router: Router ) { }

  canActivate() {

    if (!this.login.getAuthentication()) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
