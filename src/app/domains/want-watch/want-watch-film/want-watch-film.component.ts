import { Component, inject, Input } from '@angular/core';
import { Film } from 'src/app/home/film-panel/film-panel.component';
import { FilmService } from '../film/film.service';

@Component({
  selector: 'app-want-watch-film',
  templateUrl: './want-watch-film.component.html',
  styleUrls: ['./want-watch-film.component.css'],
})
export class WantWatchFilmComponent {
  filmService = inject(FilmService);
  @Input() film!: Film;

  isShow = false;
  removeFilm(filmId: Number) {
    this.filmService.removeFilmId(filmId);

    console.log(filmId);
    this.isShow = !this.isShow;
  }

  // removeFilm(filmId: number) {
  //
  // }
}
