import { NgModule } from "@angular/core";
import {FlyToLocationDirective} from './fly-to-location.directive'

@NgModule({
    declarations: [ FlyToLocationDirective ],
    exports: [ FlyToLocationDirective ]
})
export class flyToLocationModule { }