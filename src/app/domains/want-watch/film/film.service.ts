import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { Film } from 'src/app/home/film-panel/film-panel.component';
import { UserService } from 'src/app/home/film-panel/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  private moviesArray$$ = new BehaviorSubject<Array<Number>>([]);
  private films$$ = new BehaviorSubject<Film[]>([]);
  private userId: number | undefined;

  get getFilms$() {
    return this.films$$.asObservable();
  }

  get getMoviesArray() {
    return this.moviesArray$$.asObservable();
  }

  resetArray() {
    this.moviesArray$$.next([]);
  }

  getArrayOfFilmId() {
    this.authService.user$.subscribe((user) => {
      this.userId = user.id;
    });
    this.userService.getUser(this.userId).subscribe((movie) => {
      this.moviesArray$$.next([...this.moviesArray$$.value, ...movie.movies]);

      this.moviesArray$$
        .pipe(
          tap((movie) => {
            movie.map((movieId) => {
              this.films$$.next([]);
              this.getFilm(movieId);
            });
          })
        )
        .subscribe()
        .unsubscribe();
    });
  }

  removeFilmId(filmId: Number) {
    let filtrated = this.moviesArray$$.value.filter((elem) => elem !== filmId);
    this.removeFilm(filtrated);
  }

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
}
