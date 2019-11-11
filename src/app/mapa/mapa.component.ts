import { Component, OnInit } from '@angular/core';

import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  private brasil = fromLonLat([-43.1917, -22.9034]);
  private view: View;
  private map: Map;

  OSMLayer = new TileLayer({
    source: new OSM()
  });


  constructor() { }

  ngOnInit() {
    this.view = new View({
      center: this.brasil,
      zoom: 6
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

}
