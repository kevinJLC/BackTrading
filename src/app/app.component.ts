import { Component, OnInit } from '@angular/core';
import { LoginService } from './servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BackTrading';
  constructor(private login: LoginService) {}

  ngOnInit() {
    this.login.autoAuthUser();
  }

}
