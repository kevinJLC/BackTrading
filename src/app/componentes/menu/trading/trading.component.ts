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
    });


  }

  changeAction() {
    this.trading.stopTrading().subscribe(res => {
      console.log(res);
      this.cambiaAccion = !this.cambiaAccion;
    });

  }


  get capital() {return this.tradingForm.get('capital'); }
  get rendimiento() {return this.tradingForm.get('rendimiento'); }
  get periodo() {return this.tradingForm.get('periodo'); }

}
