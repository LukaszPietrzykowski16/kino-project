import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChangeDayService } from 'src/app/home/data-panel/services/change-day.service';
import { Screening } from 'src/app/home/film-panel/film-panel.component';
import { FilmLimiterService } from './film-limiter.service';

@Injectable({
  providedIn: 'root',
})
export class ExactScreeningService {
  private http = inject(HttpClient);
  private screeningInDay$$ = new BehaviorSubject<Number[]>([]);
  private changeDayService = inject(ChangeDayService);

  get getScreeningInDay$() {
    return this.screeningInDay$$.asObservable();
  }

  date = '';

  getScreening(date: Date) {
    this.date = this.changeDayService.formatDate(date);
    this.fetchScreening().subscribe((screening) => {
      const ids = screening.map(({ filmId }) => filmId);

      const uniques = Array.from(
        new Set([...this.screeningInDay$$.getValue(), ...ids])
      );

      this.screeningInDay$$.next(uniques);
    });
  }

  fetchScreening() {
    return this.http.get<Screening[]>(
      `http://localhost:3000/screening?date=${this.date}`
    );
  }
}
