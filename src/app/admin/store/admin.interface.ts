import { Film, Screening } from 'src/app/home/film-panel/film-panel.component';

export interface AdminFilmState {
  films: Film[];
  screenings: Screening[];
}
