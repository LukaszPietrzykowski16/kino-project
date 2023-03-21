import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HallComponent } from './hall/hall.component';
import { ReservationHallComponent } from './reservation-hall.component';
import { HallEffects } from './store/hall.effects';
import { addHallReducer } from './store/hall.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReservationHallComponent,
    HallComponent,
    RouterModule.forChild([
      {
        path: '',
        component: ReservationHallComponent,
      },
    ]),
    StoreModule.forFeature('hall', addHallReducer),
    EffectsModule.forFeature(HallEffects),
  ],
})
export class ReservationHallModule {}
