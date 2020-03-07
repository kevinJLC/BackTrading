import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  Esp = true;
  diagrama = false;


  constructor() { }

  ngOnInit() {
  }

  lenguageChange() {
    this.Esp = !this.Esp;

  }
  show() {
    this.diagrama = !this.diagrama;
  }

}
