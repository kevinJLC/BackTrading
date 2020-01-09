import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  MatSidenavModule,
  MatListModule,
  MatButtonToggleModule,
} from '@angular/material';

import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { DefaultSidebarComponent } from '../default-sidebar/default-sidebar.component';
import { DefaultFooterComponent } from '../default-footer/default-footer.component';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent,
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    DefaultFooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
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
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule
  ],
  exports: [
    DefaultHeaderComponent,
    DefaultSidebarComponent,
    DefaultFooterComponent
  ]

})
export class HomeModule { }
