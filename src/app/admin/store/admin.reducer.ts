import { createReducer, on } from '@ngrx/store';
import { adminFilmActions } from './admin.action';
import { initialAdminFilmState } from './admin.state';

export const adminFilmReducer = createReducer(
  initialAdminFilmState,
  on(adminFilmActions.addFilm, (state, { films }) => {
    return {
      ...state,
      ...[films],
    };
  })
);
