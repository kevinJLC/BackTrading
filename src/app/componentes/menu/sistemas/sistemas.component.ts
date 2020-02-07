import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Sistema } from '../../../sistema';
import { SistemasService } from '../../../servicios/Sistemas-Trading/sistemas.service';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';


@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})


export class SistemasComponent implements OnInit {



  // Formulario
  sistemaForm: FormGroup;
  selectedvalue: string[]; // Array que almacena los indicadores al momento de usar el formulario
  toppingList: string[] =
   [ 'ama',
     'envelopes',
     'ma',
     'atr',
     'bears',
     'bulls',
     'ema',
     'macd',
     'momentum',
     'osma',
     'a/d',
     'mfi',
     'obv',
     'volumes',
     'marketfi'
    ];

  // Tabla
  dataSource;
  listaDeSistemas;
  //<p *ngFor="let item of element.condicion"> {{item}} </p> Por si quieres que se muestren enlistados
  displayedColumns: string[] = ['nombre', 'rendimiento', 'stoploss', 'rango', 'indicadores', 'acciones'];
  // Cuando el usuario edita
  editando = false;
  selectedSystem; // almacena todos los campos de la row seleccionada al editar
  // ngModel para mandar el update y los campos de form sean validados en el input del html
  ngNombre;
  ngRendimiento;
  ngStoploss;
  ngRango;



  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      rendimiento: new FormControl('', Validators.required),
      stoploss: new FormControl('', Validators.required),
      rango: new FormControl('', Validators.required),
    });
  }
  constructor(private sistema: SistemasService) {
    this.sistemaForm = this.createFormGroup();
  }
  ngOnInit() {
    this.sistema.getSistemas().subscribe( res => {
      this.dataSource = res;
      this.listaDeSistemas = new MatTableDataSource(this.dataSource);
      this.listaDeSistemas.sort = this.sort;
      this.listaDeSistemas.paginator = this.paginator;
    });
  }

  onCreate(form: FormGroup) {
    switch (this.editando) {
      case true:
        // Edita sistemas
        if ( form.valid && this.selectedvalue !== undefined && this.selectedvalue.length !== 0) {
          this.sistema.updateSistema(this.selectedSystem._id, form.value, this.selectedvalue).subscribe(result => {
            this.sistema.getSistemas().subscribe(res => {
              this.dataSource = res;
              this.listaDeSistemas = new MatTableDataSource(this.dataSource);
              this.listaDeSistemas.sort = this.sort;
              this.listaDeSistemas.paginator = this.paginator;
            });
          });

          alert('Sistema editado con éxito');
        } else {
          alert('Formulario incompleto');
        }

        break;

      case false:
        // crea nuevos sistemas
          if ( form.valid && this.selectedvalue !== undefined && this.selectedvalue.length !== 0) {
            this.sistema.postSistema(form.value, this.selectedvalue).subscribe(result => {
              this.sistema.getSistemas().subscribe(res => {
                this.dataSource = res;
                this.listaDeSistemas = new MatTableDataSource(this.dataSource);
                this.listaDeSistemas.sort = this.sort;
                this.listaDeSistemas.paginator = this.paginator;
                console.log(this.dataSource);
              });
            });

            alert('Sistema guardado con éxito');
          } else {
            alert('no sirven tus datos');
          }
          break;
    }
  }

  aplicaFiltro(value: string) {
    this.listaDeSistemas.filter = value.trim().toLowerCase();
  }

  eliminarSistema(id) {
    this.sistema.deleteSistema(id).subscribe(result => {
      console.log(result);
      this.sistema.getSistemas().subscribe(res => {
        this.dataSource = res;
        this.listaDeSistemas = new MatTableDataSource(this.dataSource);
        this.listaDeSistemas.sort = this.sort;
        this.listaDeSistemas.paginator = this.paginator;
        console.log(this.dataSource);
      });
    });
  }

  editarSistema(sistemaSeleccionado) {
    this.editando = true;
    this.selectedSystem = sistemaSeleccionado;

    this.sistemaForm.value.nombre = this.selectedSystem.nombre;
    this.ngNombre = this.selectedSystem.nombre; // muestra ngNombre en el input

    this.sistemaForm.value.rendimiento = this.selectedSystem.rendimiento;
    this.ngRendimiento = this.selectedSystem.rendimiento;
    this.sistemaForm.value.stoploss = this.selectedSystem.stopLoss;
    this.ngStoploss = this.selectedSystem.stopLoss;
    this.sistemaForm.value.rango = this.selectedSystem.periodo;
    this.ngRango = this.selectedSystem.periodo;

    this.selectedvalue = this.selectedSystem.condicion;

  }

  cancelar() {
    this.editando = false;
    this.sistemaForm.reset();
    this.selectedvalue = [];
  }
  get nombre() {return this.sistemaForm.get('nombre'); }
  get rendimiento() {return this.sistemaForm.get('rendimiento'); }
  get stoploss() { return this.sistemaForm.get('stoploss'); }
  get rango() {return this.sistemaForm.get('rango'); }

}

