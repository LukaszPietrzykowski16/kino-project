import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart } from '../cart.interface';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'add to cart': props<{
      id: number;
      userId: number;
      date: string;
      hour: string;
      place: string;
    }>(),
  },
});
