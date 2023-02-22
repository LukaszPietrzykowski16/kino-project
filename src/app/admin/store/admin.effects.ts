import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { FilmService } from 'src/app/domains/want-watch/film/film.service';
import { FilmServiceService } from '../services/film-service.service';
import { addFilmsFromApiActions } from './admin.action';

@Injectable()
export class AdminEffects {
  private filmService = inject(FilmServiceService);
  private actions$ = inject(Actions);
  private router = inject(Router);

  film$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFilmsFromApiActions.getFilms),
      switchMap(() => {
        return this.filmService.getFilms().pipe(
          map((result) => {
            console.log(result);
            return addFilmsFromApiActions.addFilm({ films: result });
          })
        );
      })
    )
  );
}
