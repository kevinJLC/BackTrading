import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ControlContainer, NgControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  MatSortModule,
  MatTooltipModule,
  MatButtonToggleModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// componentes antes de logearse
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InicioSesionComponent } from './componentes/inicio/inicio-sesion/inicio-sesion.component';
import { RegistroComponent} from './componentes/inicio/registro/registro.component';
import { HomeModule} from './componentes/Home/home/home.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
// componentes del sidenav
// servicios
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './servicios/login.service';
import { RegistroService } from './servicios/registro.service';
import { TokenService } from './servicios/token.service';
import { ClienteComponent } from './componentes/menu/cliente/cliente.component';
import { AdministradorComponent } from './componentes/menu/administrador/administrador.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InicioSesionComponent,
    RegistroComponent,
    ClienteComponent,
    AdministradorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
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
    MatButtonToggleModule,
  ],
  providers: [LoginService, RegistroService, {provide: HTTP_INTERCEPTORS, useClass: TokenService , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
