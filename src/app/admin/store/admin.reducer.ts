import { createReducer, on } from '@ngrx/store';
import { initialAdminFilmState } from './admin.state';
import { addFilmsFromApiActions, screeningActions } from './admin.action';

export const addFilmReducer = createReducer(
  initialAdminFilmState,
  on(addFilmsFromApiActions.addFilm, (state, action) => ({
    ...state,
    films: action.films,
  })),
  on(addFilmsFromApiActions.addSingleFilm, (state, action) => ({
    ...state,
    films: [...state.films, action.films],
  }))
);

export const addScreeningReducer = createReducer(
  initialAdminFilmState,
  on(screeningActions.getScreenings, (state, action) => ({
    ...state,
    action,
  })),
  on(screeningActions.addScreenings, (state, action) => ({
    ...state,
    action: [...state.screenings, action.screenings],
  }))
);
