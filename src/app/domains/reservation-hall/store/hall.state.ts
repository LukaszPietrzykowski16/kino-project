import {
  ReservedSeatsInterface,
  SingleCinemaHall,
  SingleReservedSeats,
} from './hall.interface';

export const initialHallState: SingleCinemaHall = {
  columns: 0,
  id: 0,
  reservedSeatsId: 0,
  row: 0,
};

// export const initalStateHall: HallState = {
//   hall: initialHallState,
// };

export const initialReservedSeats: SingleReservedSeats[] = [];

export const initialReservedSeatsIds: ReservedSeatsInterface = {
  rowId: 0,
  columnId: 0,
};
