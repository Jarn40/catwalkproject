import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL_GEO = "https://api.opencagedata.com/geocode/v1/json?key=1b2e303836164c4b874eb1319a366b0a&q=";
const API_URL = 'http://localhost:8001';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  constructor(
    private http: HttpClient
  ) { }

  getLatLon(address) {
    console.log(address)
    return this.http.get(API_URL)
    //return this.http.get(API_URL_GEO + address)
  }
}
