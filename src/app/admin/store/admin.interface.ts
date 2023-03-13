import { Film, Screening } from 'src/app/home/film-panel/film-panel.interface';

export interface AdminFilmState {
  films: Film[];
}

export interface AdminScreeningState {
  screenings: Screening[];
}
