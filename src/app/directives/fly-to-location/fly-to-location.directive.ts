import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
import { MapSearchService } from 'src/app/services/map-search/map-search.service';

@Directive({
  selector: '[appFlyToLocation]'
})
export class FlyToLocationDirective {
  @Input() nameRef:string;
  constructor(
    private el: ElementRef,
    private render: Renderer,
    private map_api: MapSearchService
  ) { }

  @HostListener('mouseenter')
  flyTo() {
      this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(95%)`);
      this.map_api.flyUpdater(this.nameRef)
  }

  @HostListener('mouseleave')
  darkenOff() {
      this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
  }


}
