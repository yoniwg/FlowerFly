import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase'
})
export class SplitCamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value){
      value = value.toString()
        .split(/(?=[A-Z])/)
        .join(" ");
    }
    return value;
  }

}
