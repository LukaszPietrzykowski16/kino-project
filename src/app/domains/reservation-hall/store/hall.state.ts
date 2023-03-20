import {
  ReservedSeatsInterface,
  SingleCinemaHall,
  SingleReservedSeats,
} from './hall.interface';

export const initialHallState: SingleCinemaHall = {
  id: 0,
  row: 0,
  columns: 0,
  reservedSeatsId: 0,
};

export const initialReservedSeats: SingleReservedSeats[] = [];

export const initialReservedSeatsIds: ReservedSeatsInterface = {
  rowId: 0,
  columnId: 0,
};
