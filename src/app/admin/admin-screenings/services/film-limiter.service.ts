import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from 'src/app/home/film-panel/film-panel.component';
import { FilmServiceService } from '../../services/film-service.service';
import { ExactScreeningService } from './exact-screening.service';

@Injectable({
  providedIn: 'root',
})
export class FilmLimiterService {
  private exactScreening = inject(ExactScreeningService);
  private filmService = inject(FilmServiceService);

  private newArr$$ = new BehaviorSubject<Array<Number>>([]);
  arr: Array<Number> = [];

  get newArr$() {
    return this.newArr$$.asObservable();
  }

  filmsIdNumber$ = this.exactScreening.getScreeningInDay$;

  resetArrayFilms() {
    this.newArr$$.next([]);
    this.arr = [];
  }

  limitFilms() {
    this.resetArrayFilms();
    this.filmsIdNumber$.subscribe((test) => {
      this.arr = test;
    });

    this.filmService.getFilms().subscribe((test) => {
      test.map((newTest) => {
        for (let i = 0; i < this.arr.length; i++) {
          if (newTest.id === this.arr[i]) {
            this.newArr$$.next([...this.newArr$$.getValue(), ...[this.arr[i]]]);
          } else {
          }
        }
      });
    });
  }

  constructor() {}
}
