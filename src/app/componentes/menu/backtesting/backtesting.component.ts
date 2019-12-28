import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NgModule } from '@angular/core';
import { SistemasService} from '../../../servicios/Sistemas-Trading/sistemas.service';
import { Sistema} from '../../../sistema';
export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})
export class BacktestingComponent implements OnInit {
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  systems;
  constructor( private sistemas: SistemasService) {
    sistemas.getSistemas().subscribe(res => {
      this.systems = res;
      console.log(res);
    });
  }



  ngOnInit() {
  }

}
