import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value){
      value = value.toString()
        .split(/\s/)
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }
    return value;
  }

}
