import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { FilmService } from 'src/app/domains/want-watch/film/film.service';
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

  sendFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFilmsFromApiActions.addSingleFilm),
      switchMap((result) => {
        return this.filmService.postFilms(result.films).pipe(
          map((result) => {
            return addFilmsFromApiActions.addFilm({ films: [] });
          })
        );
      })
    )
  );

  screening$ = createEffect(() =>
    this.actions$.pipe(
      ofType(screeningActions.getScreenings),
      switchMap(() => {
        return this.screeningService.getScreening().pipe(
          map((result) => {
            console.log(result);
            return screeningActions.addScreenings({ screenings: result });
          })
        );
      })
    )
  );
}
