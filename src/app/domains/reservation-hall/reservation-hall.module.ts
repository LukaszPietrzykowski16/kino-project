import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ReservationHallComponent } from './reservation-hall.component';
import { addHallReducer } from './store/hall.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReservationHallComponent,
    RouterModule.forChild([
      {
        path: '',
        component: ReservationHallComponent,
      },
    ]),
    StoreModule.forFeature('Hall', addHallReducer),
  ],
})
export class ReservationHallModule {}
