import { createActionGroup, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Change role': props<{
      role: string;
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: number;
    }>(),
  },
});
