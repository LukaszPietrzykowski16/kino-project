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

  // order$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addOrderAction.decideOrder),
  //     combineLatest(
  //       this.orderStore.pipe(select((state) => state.order.position)),
  //       this.orderStore.pipe(select((state) => state.order.position)),
  //     )
  //     filter(([action, val1, val2]) => )
  //   )
  // );

  /*
 combineLatest(
        this.store.pipe(select((state) => state)),
        this.store.pipe(select((state) => state))
      )

  */

  // compareValues$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addOrderAction.decideOrder),
  //     switchMap(() => {
  //       return this.addOrder$;
  //     })
  //   )
  // );

  myEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.decideOrder),
      withLatestFrom(this.store.select((state) => state.order)),
      switchMap(([action, positionArray]) => {
        const compareValue = action.order[0].position;
        const moreThanOne = 1;
        const positionValue = positionArray.filter(
          (x) => x.position == compareValue
        ).length;
        console.log(positionValue, moreThanOne);
        if (positionValue <= moreThanOne) {
          return this.addOrder$;
        } else {
          return this.removeOrder$;
        }
      })
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.addOrder),
      map((action) => {
        return addOrderAction.addOrder({ order: action.order });
      })
    )
  );

  removeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.removeOrder),
      map((action) => {
        return addOrderAction.addOrder({ order: action.order });
      })
    )
  );
}
