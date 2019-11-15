import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Supermercado } from "../../interfaces/supermercado.interface"
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
const API_URL = environment.API_URL


@Injectable({
  providedIn: 'root'
})
export class GetMercadoService {

  constructor(
    private http: HttpClient
  ) { }

  getMercados() {
    return this.http.get<Supermercado[]>(API_URL)
  }

  getMercado(id) {
    return this.http.get<Supermercado>(`${API_URL}/${id}`)
  }

  addMercado(mercado) {
    return this.http.post(
      API_URL + "/insertOne",
      mercado,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  editMercado(id, mercado) {
    return this.http.post(
      `${API_URL}/${id}`,
      mercado,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  removeMercado(id) {
    return this.http.post(
      API_URL + "/deleteOne",
      { "id": id },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }
}
