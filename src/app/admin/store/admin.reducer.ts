import { createReducer, on } from '@ngrx/store';
import { adminFilmActions } from './admin.action';
import { initialAdminFilmState } from './admin.state';

export const adminFilmReducer = createReducer(
  initialAdminFilmState,
  on(
    adminFilmActions.addFilm,
    (state, { title, types, image, description, rating }) => ({
      ...state,
      title: title,
      types: types,
      image: image,
      description: description,
      rating: rating,
    })
  )
);
