import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhmm'
})
export class HhmmPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const hours: number = Math.floor(value / 60);
    const minutes: number = (value - hours * 60);

    if (hours < 10 && minutes < 10) {
      return '0' + hours + 'h:0' + (value - hours * 60) + 'min';
    }
    if (hours > 10 && minutes > 10) {
      return '0' + hours + 'h:' + (value - hours * 60) + 'min';
    }
    if (hours > 10 && minutes < 10) {
      return hours + 'h:0' +(value - hours * 60) + 'min';
    }
    if (minutes > 10) {
      return '0' + hours + 'h:' + (value - hours * 60) + 'min';
    }
  }

}
