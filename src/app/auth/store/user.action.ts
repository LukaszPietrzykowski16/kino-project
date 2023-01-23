import { createActionGroup, emptyProps } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Change default to user': emptyProps(),
    'Change default to visitor': emptyProps(),
    'Change default to admin': emptyProps(),
  },
});
