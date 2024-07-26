import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incrementDate'
})
export class IncrementDatePipe implements PipeTransform {

  transform(value: Date | string): Date {
    let date = new Date(value);
    date.setDate(date.getDate() + 1);
    return date;
  }

}
