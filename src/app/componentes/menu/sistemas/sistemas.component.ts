import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from '../../../usuario';
import { LoginService } from '../../../servicios/login.service';


@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})


export class SistemasComponent implements OnInit {


  ngOnInit() {
  }

}

