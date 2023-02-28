import { inject, Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { selectAccountType } from 'src/app/auth/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanMatch {
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);

  canMatch():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectAccountType).pipe(
      filter((type) => type !== null),
      switchMap((result) => {
        this.router.navigate(['/admin']);
        return of(result === 'admin');
      })
    );
  }
}
