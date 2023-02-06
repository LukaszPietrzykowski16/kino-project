import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeHoursService {
  formatDate(date: { getHours: () => number; getMinutes: () => any }) {
    return [
      this.padTo2Digits(date.getHours()),
      this.padTo2Digits(date.getMinutes() + 1),
    ].join(':');
  }

  padTo2Digits(num: { toString: () => string }) {
    return num.toString().padStart(2, '0');
  }
}
