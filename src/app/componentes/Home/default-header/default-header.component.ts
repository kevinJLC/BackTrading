import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { MatDialog } from '@angular/material';
import { CambiarPasswordComponent } from '../../inicio/cambiar-password/cambiar-password.component';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

  constructor(private login: LoginService, private dialog: MatDialog ) { }

  ngOnInit() {
  }

  onLogout() {
    this.login.logout();
  }

  changePassword() {
    this.dialog.open( CambiarPasswordComponent );
  }
}
