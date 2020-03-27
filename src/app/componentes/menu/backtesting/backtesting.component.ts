import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormControl, Validators, FormGroup, Form} from '@angular/forms';
import { NgModule } from '@angular/core';
import { SistemasService} from '../../../servicios/Sistemas-Trading/sistemas.service';
import { Sistema} from '../../../sistema';
import { Observable } from 'rxjs';
import { ModousuarioService } from 'src/app/servicios/Modo-Usuario/modousuario.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { BacktestingService } from 'src/app/servicios/Backtesting/backtesting.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


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


  periodoInvalido = false

  inTime: boolean = true;
  inRango: boolean = true;
  diaPreConfigurado: string;

  MuestraCampoFechaFinalizacion = false;

  empresaSimbolo: string;
  empresaOpRealizadas: number;
  empresaOpExitosas: number;
  empresaOpFallidas: number;
  empresaProbExito: number;
  empresaUsabilidad: number;
  empresaPromedioTiempo: number;
  empresaPromedioPrecioMaximo: number;
  empresaPromedioPrecioMin: number;
  muestraResultadoBacktesting = false;
  cargandoResultado = false;

  muestraOptimizar = false;




  createFormGroup() {
    return new FormGroup({
      rendimiento: new FormControl('', [Validators.required]),
      stoploss: new FormControl('', [Validators.required]),
      periodo: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFinalizacion: new FormControl('', [Validators.required])
    });
  }

  constructor( private sistemas: SistemasService, private usermode: ModousuarioService, private backtesting: BacktestingService) {
    this.backtestingForm = this.createFormGroup();
    sistemas.getSistemas().subscribe(res => {
      this.systems = res;
      console.log(this.systems);
    });
    console.log(new Date());

  }

  imprimeSistema(sistema) {

    this.backtestingForm.get('rendimiento').setValue(sistema.rendimiento);
    //this.ngRendimiento = sistema.rendimiento;
    this.ngStoploss = sistema.stopLoss;
    this.ngRango = sistema.periodo;

  }


  ngOnInit() {

  }

  onCreate(form) {


    if (form.value.periodo < 2) {
      this.periodoInvalido = true;
    }

    // no deja al usuario novato ejecutar backtesting si los campos estan incorrectos
    if (this.modoUsuario == 'aprendiz') {
      if(form.valid) {
        if(form.value.rendimiento < 3){
          if(form.value.stoploss < 1.5){
            if(form.value.periodo > 2 && form.value.periodo < 50){
              if(form.value.fechaInicio < form.value.fechaFinalizacion){
                if(this.inTime){
                  if(this.inRango){
                    console.log("todo bien desde: " + this.modoUsuario);
                    this.muestraResultadoBacktesting = false;
                    this.cargandoResultado = true;

                    this.backtesting.postBacktesting(form.value, this.selectedSystem.condicion).subscribe(res => {
                        // tslint:disable-next-line: no-string-literal
                      if (res['status'] === false) {
                        // tslint:disable-next-line: no-string-literal
                        alert(res['message']);
                      } else {
                        // tslint:disable-next-line: no-string-literal
                        console.log(res['empresa']);
                        // tslint:disable-next-line: no-string-literal
                        this.empresaSimbolo = res['empresa']['nombre'];
                        this.empresaOpRealizadas = res['empresa']['opRealizadas'];
                        this.empresaOpExitosas = res['empresa']['opExitosas'];
                        this.empresaOpFallidas = res['empresa']['opFallidas'];
                        this.empresaProbExito = res['empresa']['probabilidadExito'];
                        this.empresaUsabilidad = res['empresa']['usabilidad'];
                        this.empresaPromedioTiempo = res['empresa']['promTiempoOperacion'];
                        this.empresaPromedioPrecioMaximo = res['empresa']['promMaximoPrecio'];
                        this.empresaPromedioPrecioMin = res['empresa']['promMinimoPrecio'];
                        this.cargandoResultado = false;
                        this.muestraResultadoBacktesting = true;

                      }
                    });
                  }
                  else
                  {
                    console.log("rango de operacion incorrecto");
                    alert("Bad data, favor de corregir los valores para backtesting");
                  }
                }
                else
                {
                  console.log("No hay precios");
                  alert("Bad data, favor de corregir los valores para backtesting");
                }
              }
              else
              {
                console.log("fecha de finalizacion menor");
                alert("Bad data, favor de corregir los valores para backtesting");
              }
            }
            else
            {
              console.log("rango de operacion muy alto o muy bajo");
              alert("Bad data, favor de corregir los valores para backtesting");
            }
          }
          else
          {
            console.log("stoploss alto");
            alert("Bad data, favor de corregir los valores para backtesting");
          }
        }
        else
        {
          console.log("rendimiento alto");
          alert("Bad data, favor de corregir los valores para backtesting");
        }
      }
      else
      {
        alert("formulario invalido");
      }
    }

    if (this.modoUsuario == 'novato' || this.modoUsuario == 'pro'){
      if(form.valid){
        if(form.value.periodo > 2 && form.value.periodo < 50){
          if(form.value.fechaInicio < form.value.fechaFinalizacion) {
            if(this.inTime){
              if(this.inRango){
                console.log("todo bien desde: " + this.modoUsuario);
                this.muestraResultadoBacktesting = false;
                this.cargandoResultado = true;

                this.backtesting.postBacktesting(form.value, this.selectedSystem.condicion).subscribe(res => {
                    // tslint:disable-next-line: no-string-literal
                  if (res['status'] === false) {
                    // tslint:disable-next-line: no-string-literal
                    alert(res['message']);
                  }  else {
                    // tslint:disable-next-line: no-string-literal
                    console.log(res['empresa']);

                      this.empresaSimbolo = res['empresa']['nombre'];
                      this.empresaOpRealizadas = res['empresa']['opRealizadas'];
                      this.empresaOpExitosas = res['empresa']['opExitosas'];
                      this.empresaOpFallidas = res['empresa']['opFallidas'];
                      this.empresaProbExito = res['empresa']['probabilidadExito'];
                      this.empresaUsabilidad = res['empresa']['usabilidad'];
                      this.empresaPromedioTiempo = res['empresa']['promTiempoOperacion'];
                      this.empresaPromedioPrecioMaximo = res['empresa']['promMaximoPrecio'];
                      this.empresaPromedioPrecioMin = res['empresa']['promMinimoPrecio'];
                      this.cargandoResultado=false;
                      this.muestraResultadoBacktesting = true;
                  }
                });
              }
              else
             {
               console.log("rango de operacion incorrecto");
                alert("Bad data, favor de corregir los valores para backtesting");
              }
            }
           else
            {
             console.log("No hay precios");
             alert("Bad data, favor de corregir los valores para backtesting");
            }
          }
          else
          {
           console.log("fecha de finalizacion menor");
           console.log(typeof form.value.fechaInicio + ' '+ form.value.fechaInicio);
           alert("Bad data, favor de corregir los valores para backtesting");
          }
        }
        else
        {
          console.log("rango de operacion muy alto o muy bajo");
          alert("Bad data, favor de corregir los valores para backtesting");
        }
      }
      else{
       alert("formulario invalido");
      }
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
    if (input.getUTCFullYear() < hoy.getUTCFullYear())
    {
      this.inTime = true;
    // tslint:disable-next-line: max-line-length
    }
    else if (input.getUTCFullYear() === hoy.getUTCFullYear() && input.getUTCMonth() <= hoy.getUTCMonth())
    {
        if ( input.getUTCMonth() < hoy.getUTCMonth())
        {
          this.inTime = true;
        }
        else if ( input.getUTCMonth() === hoy.getUTCMonth() && hoy.getDate() > input.getUTCDate())
        {
          this.inTime = true;
        }
        else
        {
          this.inTime = false;
        }
      }
    else
    {
      this.inTime = false;
    }

    if (this.inTime) {
      if (Math.trunc((input.getTime() - inputInicio.getTime()) / 86400000) >= rango )
      {
        this.inRango = true;
      }
      else
      {
        this.inRango = false;
      }
    }
  }

  muestraOptimizacion() {
    this.muestraOptimizar = !this.muestraOptimizar;
  }




  get rendimiento() {return this.backtestingForm.get('rendimiento'); }
  get stoploss() {return this.backtestingForm.get('stoploss'); }
  get periodo() {return this.backtestingForm.get('periodo'); }
  get fechaInicio() {return this.backtestingForm.get('fechaInicio'); }
  get fechaFinalizacion() {return this.backtestingForm.get('fechaFinalizacion'); }

}
