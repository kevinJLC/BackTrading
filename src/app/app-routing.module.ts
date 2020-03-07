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
import { NoAuthenticatedGuardService} from './servicios/no-authenticated-guard.service';
import { AuthenticatedGuardService} from './servicios/authenticated-guard.service';
import { RecuperarCuentaComponent } from './componentes/inicio/recuperar-cuenta/recuperar-cuenta.component';
import { CambiarPasswordComponent } from './componentes/inicio/cambiar-password/cambiar-password.component';
import { NosotrosComponent} from './componentes/inicio/nosotros/nosotros.component';


const routes: Routes = [
  {path: '', component: InicioComponent, canActivate: [NoAuthenticatedGuardService]},

  {path: 'recuperacion', component: RecuperarCuentaComponent, canActivate: [NoAuthenticatedGuardService]},

  {path: 'nosotros', component: NosotrosComponent, canActivate: [NoAuthenticatedGuardService]},

  {path: 'newPassword', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: CambiarPasswordComponent }]},

  {path: 'sistemas', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: SistemasComponent }]},

  {path: 'backtesting', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: BacktestingComponent }]},

  {path: 'introduccion', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: IntroduccionComponent }]},

  {path: 'indicadores', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: IndicadoresComponent }]},

  {path: 'tutorial', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: TutorialComponent }]},

  {path: 'guia', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: GuiaComponent }]},

  {path: 'trading', component: HomeComponent, canActivate: [AuthenticatedGuardService],
  children: [{path: '', component: TradingComponent }]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuardService, NoAuthenticatedGuardService]
})
export class AppRoutingModule { }
