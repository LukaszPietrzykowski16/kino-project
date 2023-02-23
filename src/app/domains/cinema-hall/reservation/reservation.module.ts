import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '/:item/:hour/:title',
        component: ReservationComponent,
      },
    ]),
  ],
})
export class ReservationModule {}
