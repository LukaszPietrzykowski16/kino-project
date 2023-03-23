import { Order, SingleCinemaHall } from './hall.interface';

export const initialHallState: SingleCinemaHall = {
  columns: 0,
  id: 0,
  reservedSeatsId: 0,
  row: 0,
};

export const initialOrderState: Order[] = [];
