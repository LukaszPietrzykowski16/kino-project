import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from 'src/app/home/film-panel/film-panel.component';

@Injectable({
  providedIn: 'root',
})
export class FilmServiceService {
  private http = inject(HttpClient);

  postFilms(data: Film) {
    return this.http.post(`http://localhost:3000/films`, {
      id: NaN,
      description: data.description,
      image: data.image,
      rating: data.rating,
      title: data.title,
      types: data.types,
    });
  }

  getFilms() {
    return this.http.get<Film[]>(`http://localhost:3000/films`);
  }
}
