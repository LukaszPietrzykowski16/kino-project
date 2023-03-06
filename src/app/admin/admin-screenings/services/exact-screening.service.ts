import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Screening } from 'src/app/home/film-panel/film-panel.component';
import { FilmLimiterService } from './film-limiter.service';

@Injectable({
  providedIn: 'root',
})
export class ExactScreeningService {
  private http = inject(HttpClient);
  private screeningInDay$$ = new BehaviorSubject<Number[]>([]);

  get getScreeningInDay$() {
    return this.screeningInDay$$.asObservable();
  }

  date = '';

  getScreening(date: string) {
    console.log(date);
    this.date = date;
    this.fetchScreening().subscribe((screening) => {
      const ids = screening.map(({ filmId }) => filmId);

      const uniques = Array.from(
        new Set([...this.screeningInDay$$.getValue(), ...ids])
      );

      // screening.map((screen) => {
      this.screeningInDay$$.next(uniques);
      // });
    });
  }

  fetchScreening() {
    return this.http.get<Screening[]>(
      `http://localhost:3000/screening?date=${this.date}`
    );
  }

  // constructor() {}
}
