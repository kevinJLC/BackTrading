import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, Form} from '@angular/forms';
import { NgModule } from '@angular/core';
import { SistemasService} from '../../../servicios/Sistemas-Trading/sistemas.service';
import { Sistema} from '../../../sistema';
import { Observable } from 'rxjs';
import { ModousuarioService } from 'src/app/servicios/Modo-Usuario/modousuario.service';

@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})


export class BacktestingComponent implements OnInit {

  backtestingForm: FormGroup;


  systems;
  selectedSystem; // almacena valores del sistema seleccionado en tiempo real

  // ng model para mostrar valores en el formulario
  ngRendimiento;
  ngStoploss;
  ngRango;

  // Modo Usuario
  modoUsuario: string;
  modoUser$: Observable<string>;


  createFormGroup() {
    return new FormGroup({
      rendimiento: new FormControl('', [Validators.required]),
      stoploss: new FormControl('', [Validators.required]),
      periodo: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFinalizacion: new FormControl('', [Validators.required])
    });
  }

  constructor( private sistemas: SistemasService, private usermode: ModousuarioService) {
    this.backtestingForm = this.createFormGroup();
    sistemas.getSistemas().subscribe(res => {
      this.systems = res;
      console.log(this.systems);
    });
  }

  imprimeSistema(sistema) {

    this.ngRendimiento = sistema.rendimiento;
    this.ngStoploss = sistema.stopLoss;
    this.ngRango = sistema.periodo;
  }


  ngOnInit() {
    this.modoUser$ = this.usermode.getModoUser$();
    this.modoUser$.subscribe(modo => this.modoUsuario=modo);
  }

  onCreate(form: Form) {

  }


  get rendimiento() {return this.backtestingForm.get('rendimiento'); }
  get stoploss() {return this.backtestingForm.get('stoploss'); }
  get periodo() {return this.backtestingForm.get('periodo'); }
  get fechaInicio() {return this.backtestingForm.get('fechaInicio'); }
  get fechaFinalizacion() {return this.backtestingForm.get('fechaFinalizacion'); }

}
