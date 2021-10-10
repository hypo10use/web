import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'erg'
})
export class ErgPipe implements PipeTransform {

  NANO_ERG = 1000 * 1000 * 1000;

  transform(nano_erg: number): string {
    return (nano_erg / this.NANO_ERG).toString();
  }
}
