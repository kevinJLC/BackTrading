import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ControlContainer, NgControl, FormGroup, ReactiveFormsModule } from '@angular/Forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatSelect,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InicioSesionComponent } from './componentes/inicio/inicio-sesion/inicio-sesion.component';
import { RegistroComponent} from './componentes/inicio/registro/registro.component';

import { HomeModule} from './componentes/Home/home/home.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
// componentes del sidenav
import { SistemasComponent } from './componentes/menu/sistemas/sistemas.component';
import { BacktestingComponent } from './componentes/menu/backtesting/backtesting.component';
import { IntroduccionComponent } from './componentes/menu/introduccion/introduccion.component';
import { IndicadoresComponent } from './componentes/menu/indicadores/indicadores.component';
import { TutorialComponent } from './componentes/menu/tutorial/tutorial.component';
import { GuiaComponent } from './componentes/menu/guia/guia.component';
import { TradingComponent } from './componentes/menu/trading/trading.component';
// servicios
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './servicios/login.service';
import { RegistroService } from './servicios/registro.service';
import { TokenService } from './servicios/token.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InicioSesionComponent,
    RegistroComponent,
    SistemasComponent,
    BacktestingComponent,
    IntroduccionComponent,
    IndicadoresComponent,
    TutorialComponent,
    GuiaComponent,
    TradingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSelectModule,
    ScrollingModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  providers: [LoginService, RegistroService, {provide: HTTP_INTERCEPTORS, useClass: TokenService , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
