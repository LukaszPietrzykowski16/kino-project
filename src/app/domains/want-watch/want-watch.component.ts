import { Component, inject } from '@angular/core';

import { FilmService } from './film/film.service';

@Component({
  selector: 'app-want-watch',
  templateUrl: './want-watch.component.html',
  styleUrls: ['./want-watch.component.css'],
})
export class WantWatchComponent {
  constructor(private filmService: FilmService) {}

  filmService$ = this.filmService.getFilms$;

  ngOnInit() {
    this.filmService.getArrayOfFilmId();
  }
}
