import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { FilmServiceService } from '../services/film-service.service';
import { ScreeningService } from '../services/screening.service';
import { addFilmsFromApiActions, screeningActions } from './admin.action';

@Injectable()
export class AdminEffects {
  private filmService = inject(FilmServiceService);
  private screeningService = inject(ScreeningService);
  private actions$ = inject(Actions);

  film$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFilmsFromApiActions.getFilms),
      switchMap(() => {
        return this.filmService.getFilms().pipe(
          map((result) => {
            return addFilmsFromApiActions.addFilm({ films: result });
          })
        );
      })
    )
  );

  sendFilms$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addFilmsFromApiActions.addSingleFilm),
        tap((result) => {
          return this.filmService.postFilms(result.films);
        })
      ),
    { dispatch: false }
  );

  screening$ = createEffect(() =>
    this.actions$.pipe(
      ofType(screeningActions.getScreenings),
      switchMap(() => {
        return this.screeningService.getScreening().pipe(
          map((result) => {
            return screeningActions.addScreenings({ screenings: result });
          })
        );
      })
    )
  );

  sendScreenings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(screeningActions.addSingleScreening),
        tap((result) => {
          return this.screeningService.postScreening(result.screenings);
        })
      ),
    { dispatch: false }
  );
}
