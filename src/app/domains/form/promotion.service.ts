import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private promotion = false;

  getPromotion() {
    return this.promotion;
  }

  changePromotion() {
    this.promotion = true;
  }
}
