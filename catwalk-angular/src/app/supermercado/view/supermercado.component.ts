import { Component, OnInit, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { Supermercado } from '../../interfaces/supermercado.interface'
import { GetMercadoService } from '../../services/api-mercado/api-mercado.service'
import { MapSearchService } from "../../services/map-search/map-search.service"
import { FulladdressPipe } from '../../pipes/fulladdress.pipe';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.component.html',
  styleUrls: ['./supermercado.component.scss']
})
export class SupermercadoComponent implements OnInit {

  public supermercados: Supermercado[] = []
  public view = false
  public modalImage = ""
  constructor(
    private getMercadoService: GetMercadoService,
    private mapservice: MapSearchService,
    private jsonToString: FulladdressPipe,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getMercadoService.getMercados().subscribe(mercado => {
      this.supermercados = mercado
      this.mapservice.setLatLon(mercado)
    })
  }

  selfRemove(id) {
    this.getMercadoService.removeMercado(id)
      .pipe(finalize(() => {
        this.getMercadoService.getMercados().subscribe(mercado => {
          this.supermercados = mercado
          this.mapservice.removeUpdate(id)
        })
      }))
      .subscribe(response => {
        console.log(response)
      })
  }

  toogleView(option: HTMLInputElement) {
    this.view = option.checked
  }

  openVerticallyCentered(content, img) {
    this.modalImage = img
    this.modalService.open(content, { centered: true, size: 'xl', windowClass: 'custom-modal' });
  }

}
