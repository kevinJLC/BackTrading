import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, Form} from '@angular/forms';
import { TradingautomaticoService } from 'src/app/servicios/Trading-Automatico/tradingautomatico.service';


@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {
  tradingForm: FormGroup;
  cambiaAccion;
  // Variables
  statusCapital;
  statusCapitalInicial;
  statusRendimiento;
  statusPeriodo;
  statusEmpresa;
  statusIndicador;


  createFormGroup() {
    return new FormGroup({
      capital: new FormControl('', [Validators.required]),
      rendimiento: new FormControl('', [Validators.required]),
      periodo: new FormControl('', [Validators.required])
    });
  }
  constructor(private trading: TradingautomaticoService) {
    this.tradingForm = this.createFormGroup();
    trading.tradingStatus().subscribe(res => {
      console.log(res['tradingActivo']);
      this.cambiaAccion = res['tradingActivo'];
      this.statusCapital = res['capital'];
      this.statusCapitalInicial = res['capitalInicial'];
      this.statusRendimiento = res['rendimiento'];
      this.statusPeriodo = res['periodo'];
      this.statusEmpresa = res['empresa'];
      this.statusIndicador = res['indicador'];
    });
   }

  ngOnInit() {
    this.trading.tradingStatus().subscribe(res => {
      this.cambiaAccion = res['tradingActivo'];
    });
  }

  onCreate(form: FormGroup) {
    this.trading.postTrading(form.value).subscribe(res => {
      console.log(res);
      this.cambiaAccion = !this.cambiaAccion;
      this.statusCapital = form.value.capital;
      this.statusCapitalInicial = form.value.capital;
      this.statusRendimiento = form.value.rendimiento;
      this.statusPeriodo = form.value.periodo;
      this.statusEmpresa = " ";
      this.statusIndicador = " ";
    });


  }

  changeAction() {
    this.trading.stopTrading().subscribe(res => {
      console.log(res);
      this.cambiaAccion = !this.cambiaAccion;
      if (this.cambiaAccion === true) {
        this.trading.tradingStatus().subscribe(res => {
          this.statusCapital = res['capital'];
          this.statusCapitalInicial = res['capitalInicial'];
          this.statusRendimiento = res['rendimiento'];
          this.statusPeriodo = res['periodo'];
          this.statusEmpresa = res['empresa'];
          this.statusIndicador = res['indicador'];
        });
      }
    });



  }


  get capital() {return this.tradingForm.get('capital'); }
  get rendimiento() {return this.tradingForm.get('rendimiento'); }
  get periodo() {return this.tradingForm.get('periodo'); }

}
