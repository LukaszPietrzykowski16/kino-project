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

  get reservation$() {
    return this.reservation$$.asObservable();
  }

  setStrings(title: string, hour: string, day: string) {
    this.reservation$$.next({ title: title, day: day, hour: hour });
  }
}
