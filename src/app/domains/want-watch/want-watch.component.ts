import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FilmService } from './film/film.service';
import { WantWatchFilmComponent } from './want-watch-film/want-watch-film.component';

@Component({
  selector: 'app-want-watch',
  templateUrl: './want-watch.component.html',
  styleUrls: ['./want-watch.component.css'],
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, WantWatchFilmComponent],
  providers: [FilmService],
})
export default class WantWatchComponent {
  private filmService = inject(FilmService);

  filmService$ = this.filmService.getFilms$;

  ngOnInit() {
    this.filmService.resetArray();
    this.filmService.getArrayOfFilmId();
  }

  ngOnDestroy() {
    this.filmService.resetArray();
  }
}
