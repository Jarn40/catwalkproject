import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupermercadoModule } from './supermercado/supermercado.module';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { XWheelDirective } from './directives/x-wheel/x-wheel.directive';
import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapaComponent,
    XWheelDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SupermercadoModule,
    AngularSplitModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
