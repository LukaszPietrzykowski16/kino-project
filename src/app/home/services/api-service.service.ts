import { Film, Screening } from '../film-panel/film-panel.component';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  http = inject(HttpClient);

  date = '16-02';

  private films$$ = new BehaviorSubject<Film[]>(
    []

    //   {
    //   title: '',
    //   types: '',
    //   image: '',
    //   description: '',
    // }
  );

  private screenings$$ = new BehaviorSubject<Screening[]>(
    []
    // [
    //   {
    //     filmId: NaN,
    //     premiere: false,
    //     date: '',
    //     hours: [],
    //   },
    // ]
    //   {
    //   title: '',
    //   types: '',
    //   image: '',
    //   description: '',
    // }
  );

  get films$() {
    // do asyncpipe
    return this.films$$.asObservable();
  }

  get screenings$() {
    return this.screenings$$.asObservable();
  }

  url: string = `http://localhost:3000/screening?date=${this.date}`;
  arrayTest: Array<any> = [];

  constructor() {}

  changeDate(newDate: string) {
    this.date = newDate;

    this.url = `http://localhost:3000/screening?date=${newDate.replace(
      /\//g,
      '-'
    )}`;
    return this.http.get<Array<Screening>>(this.url);
  }

  getFilms() {
    return this.http
      .get<Array<Film>>(`http://localhost:3000/films`)
      .subscribe((value) => {
        this.films$$.next(value);
      });
  }

  getShowing() {
    return this.http
      .get<Array<Screening>>(
        `http://localhost:3000/screening?date=${this.date}`
      )
      .subscribe((value) => {
        this.screenings$$.next(value);
      });
  }
}
