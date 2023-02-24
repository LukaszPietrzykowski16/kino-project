import { inject, Injectable } from '@angular/core';
import { CanMatch, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import {
  AuthService,
  selectAccountType,
} from './auth/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanMatch {
  private store = inject<Store<AppState>>(Store);

  canMatch():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectAccountType).pipe(
      filter((accountType) => accountType !== null),
      switchMap((result) => {
        return of(result === 'user');
      })
    );
  }
}
