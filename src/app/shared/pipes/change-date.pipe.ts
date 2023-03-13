import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDate',
})
export class ChangeDatePipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): string {
    const formatedDate = value.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return formatedDate;
  }
}
