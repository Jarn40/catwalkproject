import { Pipe, PipeTransform } from '@angular/core';
import { SupermercadoLocation } from '../interfaces/supermercado.interface'

@Pipe({
  name: 'FulladdressPipe'
})
export class FulladdressPipe implements PipeTransform {

  transform(location: SupermercadoLocation) {

    return `${location.street}, ${location.number} - ${location.district}, ${location.city} - ${location.state} - ${location.country}, ${location.zip}`;
  }

}
