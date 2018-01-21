import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entries'
})
export class EntriesPipe implements PipeTransform {

  transform(value : Object) : any {
    if (value) {
      let entries = [];
      for (let key in value) {
        entries.push({key: key, value: value[key]});
      }
      return entries;
    }
    return value;
  }

}
