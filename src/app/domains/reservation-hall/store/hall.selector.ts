import { createSelector } from '@ngrx/store';
import { HallState, Order, OrderState } from './hall.interface';

export const selectHall = (state: HallState) => state;
export const selectOrder = (state: OrderState) => state;

export const selectorHall = createSelector(
  selectHall,
  (state: HallState) => state.hall
);

export const selectorOrder = createSelector(
  selectOrder,
  (state: OrderState) => state.order
);

export const selectorPosition = createSelector(
  selectOrder,
  (state: OrderState) => state.order
);

export const getPositionArray = (state: Order[]) => state;

export const compareValues = (compareValue: any) =>
  createSelector(getPositionArray, (valuesArray) =>
    valuesArray.includes(compareValue)
  );
