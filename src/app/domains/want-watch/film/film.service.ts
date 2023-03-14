import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import {
  Film,
  WantToWatchFilms,
} from 'src/app/home/film-panel/film-panel.interface';
import { UserService } from 'src/app/home/film-panel/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private http = inject(HttpClient);

  private moviesArray$$ = new BehaviorSubject<Array<Number>>([]);
  private films$$ = new BehaviorSubject<Film[]>([]);
  private wantToWatchFilmArray$$ = new BehaviorSubject<number[]>([]);

  get getFilms$() {
    return this.films$$.asObservable();
  }

  get getMoviesArray$() {
    return this.moviesArray$$.asObservable();
  }

  get getWantToWatchFilmArray$() {
    return this.wantToWatchFilmArray$$.asObservable();
  }

  resetArray() {
    this.moviesArray$$.next([]);
  }

  // getArrayOfFilmId() {
  //   // here
  //   this.authService.user$.subscribe((user) => {
  //     this.userId = user.id;
  //   });
  //   this.userService.getUser(this.userId).subscribe((movie) => {
  //     this.moviesArray$$.next([...this.moviesArray$$.value, ...movie.movies]);

  //     this.moviesArray$$
  //       .pipe(
  //         tap((movie) => {
  //           movie.map((movieId) => {
  //             this.films$$.next([]);
  //             this.getFilm(movieId);
  //           });
  //         })
  //       )
  //       // here
  //       .subscribe();
  //   });
  // }

  removeFilmId(filmId: Number) {}

  getFilm(filmId: Number) {
    return this.http
      .get<Film>(`http://localhost:3000/films/${filmId}`)
      .subscribe((film) => {
        this.films$$.next([...this.films$$.getValue(), film]);
      });
  }

  removeFilm(filmId: Array<Number>) {
    return this.http
      .patch<Array<Number>>(`http://localhost:3000/users/11`, {
        movies: filmId,
      })
      .subscribe();
  }

  getWantToWatchMovies() {
    return this.http
      .get<WantToWatchFilms[]>(`http://localhost:3000/want-watch`)
      .pipe(
        map((film) => {
          film.map((exactFilm) => {
            this.getFilm(exactFilm.filmId);
          });
        })
      )
      .subscribe();
  }
}
