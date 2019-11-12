import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SupermercadoComponent } from './view/supermercado.component';
import { FulladdressPipe } from '../pipes/fulladdress.pipe';
import { AddMercadoComponent } from './add-mercado/add-mercado.component';

@NgModule({
  declarations: [SupermercadoComponent, FulladdressPipe, AddMercadoComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [FulladdressPipe],
  exports: [
    SupermercadoComponent
  ]

})
export class SupermercadoModule { }
