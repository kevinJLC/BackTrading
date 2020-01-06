import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormControl, Validators, FormGroup, Form} from '@angular/forms';
import { NgModule } from '@angular/core';
import { SistemasService} from '../../../servicios/Sistemas-Trading/sistemas.service';
import { Sistema} from '../../../sistema';
import { Observable } from 'rxjs';
import { ModousuarioService } from 'src/app/servicios/Modo-Usuario/modousuario.service';
import { invalid } from '@angular/compiler/src/render3/view/util';

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
  modoUsuario: string = 'pro';
  modoUser$: Observable<string>;

  periodoInvalido = false

  inTime: boolean = true;
  inRango: boolean = true;
  diaPreConfigurado: string;

  MuestraCampoFechaFinalizacion = false;


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
    console.log(new Date());

  }

  imprimeSistema(sistema) {

    this.ngRendimiento = sistema.rendimiento;
    this.ngStoploss = sistema.stopLoss;
    this.ngRango = sistema.periodo;
  }


  ngOnInit() {
    this.modoUser$ = this.usermode.getModoUser$();
    this.modoUser$.subscribe(modo => {this.modoUsuario = modo;
      console.log(this.modoUsuario);
    });
  }

  onCreate(form) {
    if (form.value.periodo < 2) {
      this.periodoInvalido = true;
    }
  }

  enTiempo(fecha: string, inicio: string, rango: number) {
    if (inicio.length === 0 || rango === undefined || rango === null || rango === 0 || rango < 2) {
      this.MuestraCampoFechaFinalizacion = false;
      return;
    } else {
       this.MuestraCampoFechaFinalizacion = true;
     }

     if(fecha.length ===0){
       return;
     }

    // día de finalizacion
    const año = parseInt(fecha.split('-')[0]);
    const mes = parseInt(fecha.split('-')[1])-1; // 0 = Ene y 11 = Dic
    const dia = parseInt(fecha.split('-')[2]);
    const input = new Date(año, mes, dia);

    // día de inicio
    const añoInicio = parseInt(inicio.split('-')[0]);
    const mesInicio = parseInt(inicio.split('-')[1])-1; // 0 = Ene y 11 = Dic
    const diaInicio = parseInt(inicio.split('-')[2]);
    const inputInicio = new Date(añoInicio, mesInicio, diaInicio);
    var auxiliarFecha = new Date(añoInicio, mesInicio, diaInicio);
    auxiliarFecha.setDate(auxiliarFecha.getDate() + rango);

    this.diaPreConfigurado = (auxiliarFecha.getUTCFullYear() + '-' + auxiliarFecha.getUTCMonth()+1 + '-' + auxiliarFecha.getUTCDate()).toString();

    const hoy = new Date();
    console.log(inputInicio + 'quepedo');
    // tslint:disable-next-line: max-line-length
    if (input.getUTCFullYear() < hoy.getUTCFullYear()) {
      this.inTime = true;
    // tslint:disable-next-line: max-line-length
    } else if (input.getUTCFullYear() === hoy.getUTCFullYear() && input.getUTCMonth() <= hoy.getUTCMonth()) {
      if ( input.getUTCMonth() < hoy.getUTCMonth()) {
        this.inTime = true;
      } else if ( input.getUTCMonth() === hoy.getUTCMonth() && hoy.getDate() > input.getUTCDate()) {
        this.inTime = true;

        // tslint:disable-next-line: max-line-length
        if (Math.trunc((input.getTime() - inputInicio.getTime()) / 86400000) === rango ) { this.inRango = true; } else { this.inRango = false; }
        console.log(this.inRango + ' ' + Math.trunc((input.getTime() - inputInicio.getTime()) / 86400000));
      } else {
        this.inTime = false;
      }

    } else {
      this.inTime = false;
    }

  }


  get rendimiento() {return this.backtestingForm.get('rendimiento'); }
  get stoploss() {return this.backtestingForm.get('stoploss'); }
  get periodo() {return this.backtestingForm.get('periodo'); }
  get fechaInicio() {return this.backtestingForm.get('fechaInicio'); }
  get fechaFinalizacion() {return this.backtestingForm.get('fechaFinalizacion'); }

}
