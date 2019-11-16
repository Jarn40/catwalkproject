import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supermercado } from '../../interfaces/supermercado.interface'
import { FulladdressPipe } from 'src/app/pipes/fulladdress.pipe';
import { Observable, BehaviorSubject } from 'rxjs';

const API_URL_GEO = "https://api.opencagedata.com/geocode/v1/json?key=1b2e303836164c4b874eb1319a366b0a&q=";
const API_URL = 'http://localhost:8001';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  private loc = new BehaviorSubject(null)
  private flyTo = new BehaviorSubject(null)
  private layerToRemove = new BehaviorSubject(null)
  
  constructor(
    private http: HttpClient,
    private jsonToString: FulladdressPipe
  ) { }

  setLatLon(mercados: Supermercado[]) {
    //let add = "Rua Carlos Marighella, São Marcos, Salvador, BA"
    mercados.forEach((supermercado:Supermercado) =>{
      this.http.get<any>(API_URL_GEO+this.jsonToString.transform(supermercado.superMarketLocation)).subscribe(result => {
        this.loc.next([supermercado.superMarketName, result.results[0].geometry, supermercado._id])
      })
       
    })
  }

  getLatLon(){
    return this.loc.asObservable()
  }

  flyUpdater(name){
    this.flyTo.next(name)
  }
  removeUpdate(ref_id){
    this.layerToRemove.next(ref_id)
  }

  getLayertoRemove(){
    return this.layerToRemove.asObservable()
  }

  flyLocate(){
    return this.flyTo.asObservable()
  }

}
