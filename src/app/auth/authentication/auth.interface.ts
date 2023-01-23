export interface LoginData {
  accessToken: string;
  user: {
    email: string;
    password: string;
    type: string;
  };
}
