import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class NotAdminGuard implements CanActivate {
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select((state) => state.User)
      .pipe(
        map((result) => {
          if (result.type === 'admin') {
            this.router.navigate(['/admin']);
          }
          return true;
        }),
        tap(console.log)
      );
  }
}
