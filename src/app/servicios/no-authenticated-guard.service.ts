import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class NoAuthenticatedGuardService implements CanActivate {

  constructor( private login: LoginService, private router: Router ) { }

  canActivate() {
    if (this.login.getAuthentication()) {
      this.router.navigate(['/cliente']);
    }
    return true;
  }
  }
