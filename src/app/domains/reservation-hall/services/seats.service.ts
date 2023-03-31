import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map } from 'rxjs';
import { Order, OrderState } from '../store/hall.interface';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addOrderAction } from '../store/hall.action';

@Injectable({
  providedIn: 'root',
})
export class SeatsService {
  private actions$ = inject(Actions);
  private store = inject<Store<OrderState>>(Store);

  addOrder(order: Order[]) {
    return this.store.dispatch(addOrderAction.addOrder({ order: order }));
  }

  removeOrder(order: Order[]) {
    return this.store.dispatch(addOrderAction.removeOrder({ order: order }));
  }
}
