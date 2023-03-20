import { createActionGroup, emptyProps } from '@ngrx/store';

export const addCinemaHallFromApi = createActionGroup({
  source: 'Hall',
  events: {
    'get Hall': emptyProps(),
  },
});
