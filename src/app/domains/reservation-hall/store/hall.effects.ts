import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { HallService } from '../hall.service';
import { addCinemaHallFromApi } from './hall.action';

@Injectable()
export class hallEffects {
  private hallService = inject(HallService);
  private actions$ = inject(Actions);

  hall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCinemaHallFromApi.getHall),
      switchMap(() => {
        return this.hallService.getReservation().pipe(
          map((result) => {
            return addCinemaHallFromApi.addHall({ hall: result });
          })
        );
      })
    )
  );
}
