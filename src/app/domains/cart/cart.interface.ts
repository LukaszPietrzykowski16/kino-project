export interface CartState {
  cart: Cart[];
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  hour: string;
  place: string;
}
