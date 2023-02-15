import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart } from '../cart.interface';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'add to cart': props<{
      place: string;
    }>(),
  },
});
