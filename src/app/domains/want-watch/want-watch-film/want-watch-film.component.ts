import { Component, Input } from '@angular/core';
import { Film } from 'src/app/home/film-panel/film-panel.component';

@Component({
  selector: 'app-want-watch-film',
  templateUrl: './want-watch-film.component.html',
  styleUrls: ['./want-watch-film.component.css'],
})
export class WantWatchFilmComponent {
  @Input() film!: Film;

  isShow = false;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
