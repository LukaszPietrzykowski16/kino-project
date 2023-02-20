export interface UserTicket {
  email: string;
  password: string;
  type: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  id: string;
  movies: Array<Number>;
  ratings: [
    {
      filmId: 1;
      rating: 7;
    }
  ];
  tickets: {
    type: string;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  };
}

export interface SingleTicket {
  tickets: {
    type: string;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  };
}
