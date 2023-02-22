import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from 'src/app/home/film-panel/film-panel.component';
import { AdminFilmState } from '../store/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmServiceService {
  http = inject(HttpClient);

  constructor() {}

  getFilms() {
    return this.http.get<Film[]>(`http://localhost:3000/films`);
  }
}
