import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

  constructor(private login: LoginService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
  }

  onLogout() {
    this.login.logout();
  }

  changePassword() {

  }
}
