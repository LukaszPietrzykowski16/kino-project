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
    this.date = date;
    this.fetchScreening().subscribe((screening) => {
      screening.map((screen) => {
        this.screeningInDay$$.next([
          ...this.screeningInDay$$.getValue(),
          ...[screen.filmId],
        ]);
      });
    });
  }

  fetchScreening() {
    return this.http.get<Screening[]>(
      `http://localhost:3000/screening?date=${this.date}`
    );
  }

  constructor() {}
}
