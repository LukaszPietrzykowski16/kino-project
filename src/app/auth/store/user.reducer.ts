import { createReducer, on } from '@ngrx/store';
import { userActions } from './user.action';
import { initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(userActions.changeDefaultToUser, (state) => ({
    ...state,
    type: 'user',
  })),
  on(userActions.changeDefaultToVisitor, () => ({
    ...initialUserState,
  })),
  on(userActions.changeDefaultToAdmin, (state) => ({
    ...state,
    type: 'admin',
  }))
);
