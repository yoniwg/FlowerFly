import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnderScore'
})
export class FilterUnderScorePipe implements PipeTransform {

  transform(value:{key:string, value: any}[]): any {
    if (value){
      return value.filter(i => ! i.key.startsWith("_") && i.key != 'constructor');
    }
    return value;
  }

}
