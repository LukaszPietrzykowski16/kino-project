import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartState } from '../cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private store = inject<Store<CartState>>(Store);

  constructor() {}

  cart$ = this.store.select('Cart');
}
