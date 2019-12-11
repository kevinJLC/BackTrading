import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HomeComponent } from './componentes/Home/home/home.component';
import { SistemasComponent } from './componentes/menu/sistemas/sistemas.component';
import { BacktestingComponent } from './componentes/menu/backtesting/backtesting.component';
import { IntroduccionComponent } from './componentes/menu/introduccion/introduccion.component';
import { IndicadoresComponent } from './componentes/menu/indicadores/indicadores.component';
import { TutorialComponent } from './componentes/menu/tutorial/tutorial.component';
import { GuiaComponent } from './componentes/menu/guia/guia.component';
import { TradingComponent } from './componentes/menu/trading/trading.component';


const routes: Routes = [
  {path: '', component: InicioComponent },
  {path: 'sistemas', component: HomeComponent,
  children: [{path: '', component: SistemasComponent }]},

  {path: 'backtesting', component: HomeComponent,
  children: [{path: '', component: BacktestingComponent }]},

  {path: 'introduccion', component: HomeComponent,
  children: [{path: '', component: IntroduccionComponent }]},

  {path: 'indicadores', component: HomeComponent,
  children: [{path: '', component: IndicadoresComponent }]},

  {path: 'tutorial', component: HomeComponent,
  children: [{path: '', component: TutorialComponent }]},

  {path: 'guia', component: HomeComponent,
  children: [{path: '', component: GuiaComponent }]},

  {path: 'trading', component: HomeComponent,
  children: [{path: '', component: TradingComponent }]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
