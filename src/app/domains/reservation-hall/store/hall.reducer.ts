import { createReducer, on } from '@ngrx/store';
import { addCinemaHallFromApi } from './hall.action';
import { initialHallState } from './hall.state';

export const addHallFromApi = createReducer(
  initialHallState,
  on(addCinemaHallFromApi.getHall, (state, action) => ({
    ...state,
    hall: action.type,
  }))
);
