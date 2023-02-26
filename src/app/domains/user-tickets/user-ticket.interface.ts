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
      filmId: number;
      rating: number;
    }
  ];
  tickets: SingleTicket[];
}

export interface SingleTicket {
  id: number;
  title: string;
  date: string;
  hour: string;
  place: {
    seat: string;
    type: string;
  };
}
