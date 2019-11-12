import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupermercadoComponent } from './supermercado/view/supermercado.component';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { AddMercadoComponent } from './supermercado/add-mercado/add-mercado.component';


const routes: Routes = [
  {
    path: '',
    component: AddMercadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
