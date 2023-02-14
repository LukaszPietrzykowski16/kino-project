import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { CartComponent } from './cart.component';
import { cartReducer } from './store/cart.reducer';

@NgModule({
  imports: [
    CommonModule,
    CartComponent,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartComponent,
      },
    ]),
    StoreModule.forFeature('Cart', cartReducer),
  ],
})
export default class AuthModule {}
