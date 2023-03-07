import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private promotion$ = new Subject();

  getPromotion() {
    return this.promotion$;
  }
}
