import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Film } from 'src/app/home/film-panel/film-panel.interface';

import { WantWatchService } from 'src/app/home/film-panel/services/want-watch.service';
import { IconsModule } from 'src/app/icons/icons.module';

@Component({
  selector: 'app-want-watch-film',
  templateUrl: './want-watch-film.component.html',
  styleUrls: ['./want-watch-film.component.css'],
  standalone: true,
  imports: [IconsModule, CommonModule],
})
export class WantWatchFilmComponent {
  private wantWatch = inject(WantWatchService);

  @Input() film!: Film;

  isShow = false;
  removeFilm(filmId: number) {
    this.wantWatch.removeFilm(filmId);
    this.isShow = !this.isShow;
  }
}
