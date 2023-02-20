import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Film } from 'src/app/home/film-panel/film-panel.component';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private films$$ = new BehaviorSubject<Film[]>([]);
  private http = inject(HttpClient);

  get getFilms() {
    return this.films$$.asObservable();
  }

  getFilm(filmId: number) {
    return this.http
      .get<Film>(`http://localhost:3000/films/${filmId}`)
      .subscribe((film) => {
        console.log(film);
        this.films$$.next([...this.films$$.getValue(), film]);
      });
  }
}
