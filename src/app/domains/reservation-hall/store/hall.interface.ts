export interface SingleCinemaHall {
  id: number;
  row: number;
  columns: number;
  reservedSeatsId: number;
}

export interface Position {
  position: number;
}

export interface HallState {
  hall: SingleCinemaHall;
}

export interface Order {
  position: number;
  ticketType: string;
}
