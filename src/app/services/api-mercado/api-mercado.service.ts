import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Supermercado } from "../../interfaces/supermercado.interface"
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
const API_URL = environment.API_URL
const EC2 = "http://ec2-3-16-40-249.us-east-2.compute.amazonaws.com:8001"
const elastic = "http://catwalkmockup-env.7sicyxp758.us-east-2.elasticbeanstalk.com:8001"


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

  addMercado(mercado) {
    return this.http.post(
      API_URL + "/insertOne",
      this.x_www_form_generator(mercado),
      {
        headers: {
          //'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  }

  //provavelmente seja uma gambiarra até entender porque o CORS não permite acesso com json.
  x_www_form_generator(obj: Supermercado) {
    let request = ''
    for (let i = 0; i < Object.keys(obj).length; i++) {
      let key = Object.keys(obj)[i]
      if (i == 0) {
        if (typeof (obj[key]) != 'object') {
          request += `${key}=${obj[key]}`
        } else {
          request += `${key}=${JSON.stringify(obj[key])}`
        }
      } else {
        if (typeof (obj[key]) != 'object') {
          request += `&${key}=${obj[key]}`
        } else {
          request += `&${key}=${JSON.stringify(obj[key])}`
        }
      }

    }

    return request
  }


}
