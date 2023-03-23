import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addCinemaHallFromApi, addOrderAction } from './store/hall.action';
import { HallState, OrderState, Position } from './store/hall.interface';
import { HallComponent } from './hall/hall.component';
import { selectorHall, selectorOrder } from './store/hall.selector';

@Component({
  selector: 'app-reservation-hall',
  templateUrl: './reservation-hall.component.html',
  styleUrls: ['./reservation-hall.component.scss'],
  standalone: true,
  imports: [CommonModule, HallComponent],
})
export class ReservationHallComponent {
  private hallStore = inject<Store<HallState>>(Store);
  private orderStore = inject<Store<OrderState>>(Store);

  hall$ = this.hallStore.select(selectorHall);
  order$ = this.orderStore.select(selectorOrder);

  ngOnInit() {
    this.hallStore.dispatch(addCinemaHallFromApi.getHall());
  }

  handleClickingButton(test: Position) {
    this.orderStore.dispatch(
      addOrderAction.addOrder({
        order: { position: test.position, ticketType: 'Bilet normalny' },
      })
    );
  }
}
