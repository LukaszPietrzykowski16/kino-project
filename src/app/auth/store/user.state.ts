import { UserState } from './user.interface';

export const initialUserState: UserState = {
  type: 'visitor',
  id: NaN,
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: NaN,
};
