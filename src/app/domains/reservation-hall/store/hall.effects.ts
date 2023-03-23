import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, of } from 'rxjs';
import { HallService } from '../hall.service';
import { addCinemaHallFromApi, addOrderAction } from './hall.action';
import { Order } from './hall.interface';

@Injectable()
export class HallEffects {
  private hallService = inject(HallService);
  private actions$ = inject(Actions);

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

  // order$ = createEffect((order: Order) => {
  //   this.actions$.pipe(ofType(addOrderAction.decideOrder),
  //   map(() => {

  //   })
  //   );
  // })

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction.decideOrder)

      // switchMap((action) => {
      //   tap((action) => {
      //     console.log(action);
      //   });
      //   return of(action);
      // })
    )
  );
}
