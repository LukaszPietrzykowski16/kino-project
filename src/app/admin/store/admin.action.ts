import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Film, Screening } from 'src/app/home/film-panel/film-panel.interface';

export const addFilmsFromApiActions = createActionGroup({
  source: 'AdminFilm',
  events: {
    'get Films': emptyProps(),
    'Add film': props<{
      films: Film[];
    }>(),
    'Add single film': props<{
      films: Film;
    }>(),
  },
});

export const screeningActions = createActionGroup({
  source: 'AdminScreening',
  events: {
    'get Screenings': emptyProps(),
    'Add Screenings': props<{
      screenings: Screening[];
    }>(),
    'add Single Screening': props<{
      screenings: Screening;
    }>(),
  },
});
