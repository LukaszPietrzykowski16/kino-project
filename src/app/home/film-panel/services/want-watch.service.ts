import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WantWatchService {
  private ratingArray$$ = new BehaviorSubject<Number[]>([]);

  get getRatingArray$() {
    return this.ratingArray$$.asObservable();
  }

  addFilmsArray(films: Number[]) {
    this.ratingArray$$.next(films);
  }

  addFilm(filmId: number) {
    this.ratingArray$$.next([...this.ratingArray$$.getValue(), ...[filmId]]);
  }

  removeFilm(filmId: number) {
    let filtrated = this.ratingArray$$.value.filter((elem) => elem !== filmId);
    this.ratingArray$$.next(filtrated);
  }
}
