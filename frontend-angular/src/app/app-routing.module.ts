import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupermercadoComponent } from './supermercado/view/supermercado.component';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { AddMercadoComponent } from './supermercado/add-mercado/add-mercado.component';
import { EditMercadoComponent } from './supermercado/edit-mercado/edit-mercado.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-mercado',
    component: AddMercadoComponent
  },
  {
    path: 'edit/:id',
    component: EditMercadoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
