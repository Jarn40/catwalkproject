import { Directive, ElementRef, Renderer, HostListener, Input, ViewChild } from '@angular/core';

@Directive({
  selector: '[appBiggerOnHover]'
})
export class BiggerOnHoverDirective {
  @Input() img_src = '';
  @Input() target:HTMLDivElement;
  
  constructor(
    private el: ElementRef,
    private render: Renderer
  ) { }

  @HostListener('mouseover',['$event'])
    bigger_image(event) {
        console.log(event.x, event.y)
        //this.render.setElementStyle(this.target, 'filter', `brightness(50)`);
        this.target.childElementCount
        console.log(this.target.style)
    }



}
