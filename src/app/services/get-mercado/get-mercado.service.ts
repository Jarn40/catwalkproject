import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supermercado } from "../../interfaces/supermercado.interface"
const API_URL = 'http://localhost:8001';



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
}
