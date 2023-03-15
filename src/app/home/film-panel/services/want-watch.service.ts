import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SendMovieService } from './send-movie.service';

@Injectable({
  providedIn: 'root',
})
export class WantWatchService {
  private ratingArray$$ = new BehaviorSubject<Number[]>([]);
  private sendMoviesService = inject(SendMovieService);

  get getRatingArray$() {
    return this.ratingArray$$.asObservable();
  }

  addFilmsArray(films: Number[]) {
    this.ratingArray$$.next(films);
  }

  addFilm(filmId: number) {
    this.ratingArray$$.next([...this.ratingArray$$.getValue(), ...[filmId]]);
    this.sendFilmsToDb();
  }

  removeFilm(filmId: number) {
    console.log(filmId);
  }

  sendFilmsToDb() {
    this.getRatingArray$
      .subscribe((values) => {
        this.sendMoviesService.postMovie(11, values);
      })
      .unsubscribe();
  }
}
