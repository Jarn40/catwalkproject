import { Component, OnInit, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { Supermercado } from '../../interfaces/supermercado.interface'
import { GetMercadoService } from '../../services/get-mercado/get-mercado.service'
import { MapSearchService } from "../../services/map-search/map-search.service"
import { FulladdressPipe } from '../../pipes/fulladdress.pipe';

@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.component.html',
  styleUrls: ['./supermercado.component.scss']
})
export class SupermercadoComponent implements OnInit, DoCheck {

  supermercados: Supermercado[] = []

  constructor(
    private getMercadoService: GetMercadoService,
    private enderecoToGeo: MapSearchService,
    private jsonToString: FulladdressPipe
  ) { }

  ngOnInit() {
    this.getMercadoService.getMercados().subscribe(mercado => {
      this.supermercados = mercado
    })
  }
  ngDoCheck() {
    this.supermercados.forEach(mercado => {
      //console.log(this.enderecoToGeo.getLatLon(this.jsonToString.transform(mercado.superMarketLocation)).subscribe())
    })
  }
}
