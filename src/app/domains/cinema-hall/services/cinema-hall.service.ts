import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Reservation {
  title: string;
  day: string;
  hour: string;
}

@Injectable({
  providedIn: 'root',
})
export class CinemaHallService {
  private reservation$$ = new BehaviorSubject<Reservation>({
    title: '',
    day: '',
    hour: '',
  });
  title: string = '';
  day: string = '';
  hour: string = '';

  get reservation$() {
    return this.reservation$$.asObservable();
  }

  constructor() {}

  displayInfo() {
    return [this.title, this.day, this.hour];
  }

  setStrings(title: string, hour: string, day: string) {
    this.reservation$$.next({ title: title, day: day, hour: hour });
    this.title = title;
    this.hour = hour;
    this.day = day;
  }
}
