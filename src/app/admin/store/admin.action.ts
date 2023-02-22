import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminFilmState } from './admin.interface';

export const adminFilmActions = createActionGroup({
  source: 'AdminFilm',
  events: {
    'Add film': props<{
      films: AdminFilmState;
    }>(),
  },
});

export const addFilmsFromApi = createActionGroup({
  source: 'AdminFilm',
  events: {
    'Add film': props<{
      films: AdminFilmState;
    }>(),
  },
});
