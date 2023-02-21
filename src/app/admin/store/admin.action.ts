import { createActionGroup, props } from '@ngrx/store';

export const adminFilmActions = createActionGroup({
  source: 'AdminFilm',
  events: {
    'Add film': props<{
      title: '';
      types: '';
      image: '';
      description: '';
      rating: '';
    }>(),
  },
});
