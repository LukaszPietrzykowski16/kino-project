import { inject, Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  switchMap,
  map,
  tap,
  of,
  withLatestFrom,
  combineLatest,
  filter,
  concatMap,
  take,
} from 'rxjs';
import { HallService } from '../hall.service';
import { addCinemaHallFromApi, addOrderAction } from './hall.action';
import { Order, OrderState } from './hall.interface';
import { selectorOrder } from './hall.selector';

@Injectable()
export class HallEffects {
  private hallService = inject(HallService);
  private actions$ = inject(Actions);

  private store = inject<Store<OrderState>>(Store);

  test = this.store.pipe(select(selectorOrder));

  hall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCinemaHallFromApi.getHall),
      switchMap(() => {
        return this.hallService.getReservation().pipe(
          map((result) => {
            return addCinemaHallFromApi.addHall({ hall: result[0] });
          })
        );
      })
    )
  );

  myEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.decideOrder),
      withLatestFrom(this.store.select((state) => state.order)),
      switchMap(([action, positionArray]) => {
        console.log(action, positionArray);
        const compareValue = action.order[0].position;
        const moreThanOne = 1;
        const positionValue = positionArray.filter(
          (x) => x.position == compareValue
        ).length;

        if (positionValue <= moreThanOne) {
          return of(addOrderAction.addOrder(action));
        } else {
          return of(addOrderAction.addOrder(action));
        }
      })
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.addOrder),
      take(0),
      map((action) => {
        console.log(action.order);
        return addOrderAction.addOrder({ order: action.order });
      })
    )
  );

  removeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.removeOrder),
      map((action) => {
        return addOrderAction.removeOrder({ order: action.order });
      })
    )
  );
}
