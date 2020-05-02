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
// import Cesium from 'cesium/Build/Cesium/Cesium.js'
import * as Cesium from 'cesium/Build/Cesium/Cesium.js';
import OLCesium from 'ol-cesium';

// import Cesium from 'cesium/Cesium';
// require('cesium/Widgets/widgets.css');
// import OLCesium from 'ol-cesium';
// window['Cesium'] = '../../../node_modules/cesium/Build/Cesium/Cesium.js';
// window['Cesium'] = Cesium;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit,OnDestroy {
  // private Cesium = Cesium
  // private Cesium = require('cesium/Build/Cesium/Cesium.js')
  private brasil = fromLonLat([-43.1917, -22.9034]);
  private view: View;
  private map: Map;
  private coordMap = {}
  private getLL:Subscription;
  private getLoc:Subscription;
  private layerRemover:Subscription;
  OSMLayer = new TileLayer({
    source: new OSM(),
    name:"MAPA"
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
        this.coordMap[val[2]] = val[1]
        this.pinMercados(val)
      }
    })
    this.getLoc = this.map_api.flyLocate().subscribe(layer_id =>{
      if(layer_id){
        this.changeV(layer_id)
      }
    })
    this.layerRemover = this.map_api.getLayertoRemove().subscribe(layer_name => {
      if(layer_name){
        this.removeMercado(layer_name)
      }
    })
  }
  ngOnDestroy(): void {
    this.getLL.unsubscribe()
    this.getLoc.unsubscribe()
    this.layerRemover.unsubscribe()
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
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMWUwMzhkNS1hNzBjLTQyOTMtYjgyYS01OWJjNTVlYzVmY2UiLCJpZCI6MTg4MzIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzQ0NDk2MDN9.sLrdVNWFVUO32HaWzj6MA94IO6doEl7YGiKJoxddT68';
    const ol3d = new OLCesium({map: this.map,time() {
      return Cesium.JulianDate.now();
    }}); // ol2dMap is the ol.Map instance
    // const scene = ol3d.getCesiumScene();
    // scene.terrainProvider = Cesium.createWorldTerrain();
    ol3d.setEnabled(true);
  }

  changeV(layer_id){
    let fly_to = this.coordMap[layer_id]
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
      source: vectorSource,
      name: location[2],
    });
    this.map.addLayer(vectorLayer)
  }

  removeMercado(ref_id){
    let layers =this.map.getLayers().getArray()
    for( let layer in layers){
      if(layers[layer].get('name') == ref_id){
        return this.map.removeLayer(layers[layer])
      }
    }
  } 
}

