import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'angular-feather/icons';
import { BehaviorSubject } from 'rxjs';
import { CheckUserService } from 'src/app/auth/authentication/check-user.service';

export interface Ratings {
  id: number;
  userId: number;
  filmId: number;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private rating$$ = new BehaviorSubject<Ratings>({} as Ratings);

  get ratings$() {
    return this.rating$$.asObservable();
  }

  private http = inject(HttpClient);
  private fetchUser = inject(CheckUserService);

  getRatings() {
    return this.http.get<Ratings>(`http://localhost:3000/ratings?userId=11`);
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
}
