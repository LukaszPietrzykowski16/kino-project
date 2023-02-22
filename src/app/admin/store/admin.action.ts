import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminFilmState } from './admin.interface';
import { Film } from 'src/app/home/film-panel/film-panel.component';

// export const adminFilmActions = createActionGroup({
//   source: 'AdminFilm',
//   events: {
//     'Add film': props<{
//       films: Film;
//     }>(),
//   },
// });

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
