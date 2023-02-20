import { UserState } from './user.interface';

export const initialUserState: UserState = {
  type: 'visitor',
  id: 11,
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: NaN,
};
