import { createReducer, on } from '@ngrx/store';
import { initialAdminFilmState } from './admin.state';
import { AdminState } from '../admin.module';
import { addFilmsFromApiActions } from './admin.action';
import { state } from '@angular/animations';

// export const adminFilmReducer = createReducer(
//   initialAdminFilmState,
//   on(addFilmsFromApiActions.addFilm, (state, { films }) => {
//     return {
//       ...state,
//       ...[films],
//     };
//   })
// );

export const addFilmReducer = createReducer(
  initialAdminFilmState,
  on(addFilmsFromApiActions.addFilm, (state, action) => {
    return {
      ...state,
      ...action.films,
    };
  })
);
