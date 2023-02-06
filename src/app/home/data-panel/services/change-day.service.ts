import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeDayService {
  formatDate(date: {
    getMonth: () => number;
    getDate: () => any;
    getFullYear: () => any;
  }) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
    ].join('/');
  }

  padTo2Digits(num: { toString: () => string }) {
    return num.toString().padStart(2, '0');
  }
  constructor() {}
}
