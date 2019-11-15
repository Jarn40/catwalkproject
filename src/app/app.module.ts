import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupermercadoModule } from './supermercado/supermercado.module';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';

import { AngularSplitModule } from 'angular-split';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapaComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SupermercadoModule,
    AngularSplitModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
