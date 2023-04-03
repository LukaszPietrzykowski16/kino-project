import { createReducer, on } from '@ngrx/store';
import { addCinemaHallFromApi, addOrderAction } from './hall.action';
import { Order } from './hall.interface';
import { initialHallState, initialOrderState } from './hall.state';

export const addHallReducer = createReducer(
  initialHallState,
  on(addCinemaHallFromApi.getHall, (state, action) => ({
    ...state,
    hall: action,
  })),
  on(addCinemaHallFromApi.addHall, (state, action) => ({
    ...state,
    ...action.hall,
  }))
);

export const addOrderReducer = createReducer(
  initialOrderState,
  on(addOrderAction.decideOrder, (state, action) => state),
  on(addOrderAction.removeOrder, (state, action) => {
    const newOrder = action.order.map((ticket) => {
      return ticket.position;
    });
    // const updatedItems: any = state.map((i) =>
    //   i.position === newOrder[0] ? newOrder : i
    // );
    const updatedItems = state.filter((i) => i.position !== newOrder[0]);

    console.log(updatedItems);
    return updatedItems;
  }),
  on(addOrderAction.addOrder, (state, action) => [...state, ...action.order])
);
