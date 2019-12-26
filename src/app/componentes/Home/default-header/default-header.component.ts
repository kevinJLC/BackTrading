import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

  constructor(private login: LoginService ) { }

  ngOnInit() {
  }

  onLogout() {
    this.login.logout();
  }
}
