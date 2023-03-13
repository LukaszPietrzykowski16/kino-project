import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ratings } from '../film-panel.interface';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private http = inject(HttpClient);

  private rating$$ = new BehaviorSubject<Ratings>({
    id: 0,
    userId: 11,
    filmId: 0,
    rating: 0,
  });

  get ratings$() {
    return this.rating$$.asObservable();
  }

  getRatings(obj: Ratings) {
    this.rating$$.next(obj);
  }

  patchRatings(filmId: number, rating: number) {
    const info = {
      id: NaN,
      userId: 11,
      filmId: filmId,
      rating: rating,
    };
    return this.http
      .post<Ratings>(`http://localhost:3000/ratings`, info)
      .subscribe((data) => {
        this.rating$$.next(data);
      });
  }

  checkRating(filmId: number) {
    return this.http.get<Ratings[]>(
      `http://localhost:3000/ratings?userId=11&filmId=${filmId}`
    );
  }
}
