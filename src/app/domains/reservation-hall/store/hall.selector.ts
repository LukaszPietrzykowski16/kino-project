import { createSelector } from '@ngrx/store';
import { HallState } from './hall.interface';

export const selectHall = (state: HallState) => state;

export const selectorHall = createSelector(
  selectHall,
  (state: HallState) => state.hall
);
