import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { switchMap, map, tap, of, withLatestFrom } from 'rxjs';
import { HallService } from '../hall.service';
import { addCinemaHallFromApi, addOrderAction } from './hall.action';
import { Order, OrderState } from './hall.interface';

@Injectable()
export class HallEffects {
  private hallService = inject(HallService);
  private actions$ = inject(Actions);

  private orderStore = inject<Store<OrderState>>(Store);

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

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.decideOrder),
      switchMap((result) => {
        const position = result.order[0].position;

        return this.addOrder$;
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
