import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ratings } from './rating.service';

export interface UserMovies {
  movies: Array<Number>;
  ratings: Array<Ratings>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUser(userId: number | undefined) {
    return this.http.get<UserMovies>(`http://localhost:3000/users/${userId}`);
  }
}
