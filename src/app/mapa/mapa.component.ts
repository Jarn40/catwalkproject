import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';

import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import { MapSearchService } from '../services/map-search/map-search.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit,OnDestroy {
  private brasil = fromLonLat([-43.1917, -22.9034]);
  private view: View;
  private map: Map;
  private coordMap = {}
  private getLL:Subscription;
  private getLoc:Subscription;
  OSMLayer = new TileLayer({
    source: new OSM()
  });


  constructor(
    private map_api: MapSearchService
  ) { }

  @HostListener('mouseenter')
  @HostListener('mouseleave')
  onResize() {
    setTimeout( () => { this.map.updateSize();}, 200);
  }

  ngOnInit() {
    this.setMap()
    this.getLL = this.map_api.getLatLon().subscribe( val => {
      if(val){
        this.coordMap[val[0]] = val[1]
        this.pinMercados(val)
      }
    })
    this.getLoc = this.map_api.flyLocate().subscribe(position_name =>{
      if(position_name){
        this.changeV(position_name)
      }
    }  
    )
  }
  ngOnDestroy(): void {
    this.getLL.unsubscribe()
    this.getLoc.unsubscribe()
  }

  setMap(){
    this.view = new View({
      center: this.brasil,
      zoom: 8
    });
    this.map = new Map({
      target: 'map',
      layers: [this.OSMLayer],
      // Improve user experience by loading tiles while animating. Will make
      // animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: false,
      view: this.view
    });
  }

  changeV(name){
    let fly_to = this.coordMap[name]
    if(fly_to){
      this.view.setCenter(fromLonLat([fly_to.lng, fly_to.lat]))
      this.view.setZoom(15)
    }

  }

  pinMercados(location){
    var iconFeature = new Feature({
      geometry: new Point(fromLonLat([location[1].lng, location[1].lat])),
      name: location[0],
      population: 4000,
      rainfall: 500
    });

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '../../assets/img/home_icon.png',
        scale: 0.05
      })
    });
    
    iconFeature.setStyle(iconStyle);
    
    var vectorSource = new VectorSource({
      features: [iconFeature]
    });
    
    var vectorLayer = new VectorLayer({
      source: vectorSource
    });
    this.map.addLayer(vectorLayer)
  }
  
}

