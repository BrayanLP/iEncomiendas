import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colaboradores',
  pure: false
})
export class ColaboradoresPipe implements PipeTransform {

  transform(values: any[], filter: string): any {
    if (!values || !values.length) {
      return [];
    }
    if (!filter){
      return values;
    }
    return values.filter(usu => usu.email.indexOf(filter) >= 0);
  }

}
