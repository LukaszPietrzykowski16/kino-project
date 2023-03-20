export interface SingleCinemaHall {
  id: number;
  row: number;
  columns: number;
  reservedSeatsId: number;
}

export interface SingleReservedSeats {
  id: number;
  reservedSeats: ReservedSeatsInterface[];
}

export interface ReservedSeatsInterface {
  rowId: number;
  columnId: number;
}
