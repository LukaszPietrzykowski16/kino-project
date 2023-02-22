import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { adminFilmActions } from './admin.action';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  film$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adminFilmActions.addFilm), // akcaj getfilms
      tap(() => {
        console.log('hello'); // wywoła metodę z serwisu pobierjaca
        return of(0); // map result => retun akcja dodania do stnau(result)
      })
    )
  );
}
