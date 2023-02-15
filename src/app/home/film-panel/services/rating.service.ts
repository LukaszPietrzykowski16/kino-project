import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'angular-feather/icons';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private http = inject(HttpClient);

  sendRating(userId: number, ratingNumber: number, filmId: number) {
    return this.http
      .patch<any>(`http://localhost:3000/users/${userId}`, {
        ratings: [
          {
            filmId: filmId,
            rating: ratingNumber,
          },
        ],
      })
      .subscribe();
  }
}
