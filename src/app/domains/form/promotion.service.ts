import { Injectable } from '@angular/core';
import { StateObservable } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private promotion$ = new Subject();

  getPromotion() {
    return this.promotion$;
  }
}
