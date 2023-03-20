import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SingleCinemaHall } from './hall.interface';

export const addCinemaHallFromApi = createActionGroup({
  source: 'Hall',
  events: {
    'get Hall': emptyProps(),
    'add Hall': props<{ hall: SingleCinemaHall }>(),
  },
});
