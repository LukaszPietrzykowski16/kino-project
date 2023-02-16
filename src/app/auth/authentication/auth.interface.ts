export interface LoginData {
  accessToken: string;
  user: {
    phoneNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    id: number;
  };
}
