import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { TicketsService } from 'src/app/domains/cinema-hall/reservation/services/tickets.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedSeatGuard implements CanActivate {
  private router = inject(Router);
  private ticektStateService = inject(TicketsService);

  canActivate(): Observable<boolean> {
    return this.ticektStateService.tickets$.pipe(
      map((r) => {
        if (r.length === 0) {
          this.router.navigateByUrl('');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
