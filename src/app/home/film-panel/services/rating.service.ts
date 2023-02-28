import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'angular-feather/icons';
import { BehaviorSubject } from 'rxjs';
import { CheckUserService } from 'src/app/auth/authentication/check-user.service';

interface Ratings {
  filmId: number;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private http = inject(HttpClient);
  private fetchUser = inject(CheckUserService);
  private arrayOfRatings$$ = new BehaviorSubject<Ratings[]>([]);

  get arrayOfRatiings$() {
    return this.arrayOfRatings$$.asObservable();
  }
  filmId: number = NaN;
  setFilmId(filmId: number) {
    this.filmId = filmId;
  }

  sendRating(userId: number, ratingNumber: number) {
    this.fetchUser.fetchUser(String(userId)).subscribe((test) => {
      this.arrayOfRatings$$.next([
        ...this.arrayOfRatings$$.getValue(),
        ...test.ratings,
      ]);
    });

    this.arrayOfRatings$$.value.map((val) => {
      if (val.filmId === this.filmId) {
        val.filmId = this.filmId;
        val.rating = ratingNumber;
      }
    });
    this.arrayOfRatings$$.next([
      ...this.arrayOfRatings$$.getValue(),
      ...[{ filmId: this.filmId, rating: ratingNumber }],
    ]);
    this.sendRatingToDb(userId);
  }

  sendRatingToDb(userId: number) {
    let arr: Array<Ratings> = [];
    this.arrayOfRatiings$.subscribe((test) => {
      arr = [...arr, ...test];
    });

    return this.http
      .patch(`http://localhost:3000/users/${userId}`, {
        ratings: arr,
      })
      .subscribe();
  }
}
