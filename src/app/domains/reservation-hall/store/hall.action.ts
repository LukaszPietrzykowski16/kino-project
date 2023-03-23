import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, SingleCinemaHall } from './hall.interface';

export const addCinemaHallFromApi = createActionGroup({
  source: 'hall',
  events: {
    'get Hall': emptyProps(),
    'add Hall': props<{ hall: SingleCinemaHall }>(),
  },
});

export const addOrderAction = createActionGroup({
  source: 'order',
  events: {
    'add Order': props<{ order: Order[] }>(),
  },
});
