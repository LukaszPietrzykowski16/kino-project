import { Film, Screening } from 'src/app/home/film-panel/film-panel.component';

export interface AdminFilmState {
  films: Film[];
}

export interface AdminScreeningState {
  screenings: Screening[];
}
