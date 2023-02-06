import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
  type: string;
  id: number;
  movies: Array<String>;
}

@Injectable({
  providedIn: 'root',
})
export class SendMovieService {
  private http = inject(HttpClient);

  postMovie(userId: number, moviesArray: Array<Number>) {
    return this.http
      .patch<User>(`http://localhost:3000/users/${userId}`, {
        id: userId,
        movies: moviesArray,
      })
      .subscribe();
  }
}
