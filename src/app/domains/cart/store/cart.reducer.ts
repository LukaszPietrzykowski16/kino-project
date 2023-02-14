import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.action';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, { id, userId, type, date, hour }) => ({
    ...state,
    id: id,
    userId: userId,
    place: type,
    date: date,
    hour: hour,
  }))
);
