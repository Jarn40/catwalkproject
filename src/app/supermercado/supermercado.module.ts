import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SupermercadoComponent } from './supermercado.component';
import { FulladdressPipe } from '../pipes/fulladdress.pipe';

@NgModule({
  declarations: [SupermercadoComponent, FulladdressPipe],
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
