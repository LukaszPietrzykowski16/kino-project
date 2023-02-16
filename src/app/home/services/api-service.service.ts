import {
  Film,
  Repertoire,
  Screening,
} from '../film-panel/film-panel.component';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  http = inject(HttpClient);

  date = '16-02';

  private films$$ = new BehaviorSubject<Film[]>([
    {
      id: NaN,
      title: '',
      types: '',
      image: '',
      description: '',
      rating: NaN,
    },
  ]);

  private film$$ = new BehaviorSubject<Film>({
    id: NaN,
    title: '',
    types: '',
    image: '',
    description: '',
    rating: NaN,
  });

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

  get film$() {
    // do asyncpipe
    return this.film$$.asObservable();
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
  // http://localhost:3000/screening?_expand=film
  getShowing() {
    return this.http
      .get<Array<Repertoire>>(
        `http://localhost:3000/screening?date=${this.date}&_expand=film`
        // `http://localhost:3000/screening?date=${this.date}`
      )
      .subscribe((value) => {
        console.log(value);
        this.screenings$$.next(value);
      });
  }

  getFilm(filmId: number) {
    return this.http
      .get<Film>(`http://localhost:3000/films/${filmId}`)
      .subscribe((value) => {
        console.log(value);
        this.film$$.next(value);
      });
  }
}
