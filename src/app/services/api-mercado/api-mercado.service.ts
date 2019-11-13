import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Supermercado } from "../../interfaces/supermercado.interface"
import { Observable } from 'rxjs';
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

  addMercado(mercado){
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        'Content-Type':  'formdata',
        //'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
      })
    };
    return this.http.post(
      API_URL+"/insertOne",
      JSON.stringify(mercado),
      {
        headers: {
          'Content-Type':  'application/json'
          //'Content-Type':'application/x-www-form-urlencoded'
        }
      })

    //, {headers: { 'Content-Type': 'application/json' }}
  }
}
