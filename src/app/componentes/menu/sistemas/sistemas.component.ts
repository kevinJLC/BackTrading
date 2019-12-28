import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Sistema } from '../../../sistema';
import { SistemasService } from '../../../servicios/Sistemas-Trading/sistemas.service';


@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})


export class SistemasComponent implements OnInit {

  sistemaForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      rendimiento: new FormControl('', Validators.required),
      stoploss: new FormControl('', Validators.required),
      rango: new FormControl('', Validators.required)
    });
  }
  constructor(private sistema: SistemasService) {
    this.sistemaForm = this.createFormGroup();
  }
  ngOnInit() {
  }

  onCreate(form: FormGroup) {
    if (form.valid) {
      this.sistema.postSistema(form.value).subscribe(res => {
        console.log(res);
      });
      alert('Sistema guardado con éxito');
    } else {
      alert('no sirven tus datos');
    }
  }
  get nombre() {return this.sistemaForm.get('nombre'); }
  get rendimiento() {return this.sistemaForm.get('rendimiento'); }
  get stoploss() { return this.sistemaForm.get('stoploss'); }
  get rango() {return this.sistemaForm.get('rango'); }

}

