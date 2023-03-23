import { createReducer, on } from '@ngrx/store';
import { addCinemaHallFromApi, addOrderAction } from './hall.action';
import { initialHallState, initialOrderState } from './hall.state';

export const addHallReducer = createReducer(
  initialHallState,
  on(addCinemaHallFromApi.getHall, (state, action) => ({
    ...state,
    hall: action,
  })),
  on(addCinemaHallFromApi.addHall, (state, action) => ({
    ...state,
    ...action.hall,
  }))
);

export const addOrderReducer = createReducer(
  initialOrderState,
  on(addOrderAction.decideOrder, (state, action) => [
    ...state,
    ...action.order,
  ]),
  on(addOrderAction.removeOrder, (state, action) => [
    ...state,
    ...action.order,
  ]),
  on(addOrderAction.addOrder, (state, action) => [...state, ...action.order])
);
