import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'angular-feather/icons';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private http = inject(HttpClient);
  filmId: number = NaN;
  setFilmId(filmId: number) {
    this.filmId = filmId;
  }

  sendRating(userId: number, ratingNumber: number) {
    // here i need to mock for db.json
    return this.http
      .patch(`http://localhost:3000/users/${userId}`, {
        ratings: [
          {
            filmId: this.filmId,
            rating: ratingNumber,
          },
        ],
      })
      .subscribe();
  }
}
