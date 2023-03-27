import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addCinemaHallFromApi, addOrderAction } from './store/hall.action';
import { HallState, OrderState, Position } from './store/hall.interface';
import { HallComponent } from './hall/hall.component';
import { selectorHall, selectorOrder } from './store/hall.selector';
import { SelectTicketComponent } from './select-ticket/select-ticket.component';

@Component({
  selector: 'app-reservation-hall',
  templateUrl: './reservation-hall.component.html',
  styleUrls: ['./reservation-hall.component.scss'],
  standalone: true,
  imports: [CommonModule, HallComponent, SelectTicketComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationHallComponent {
  private hallStore = inject<Store<HallState>>(Store);
  private orderStore = inject<Store<OrderState>>(Store);

  hall$ = this.hallStore.select(selectorHall);
  order$ = this.orderStore.select(selectorOrder);

  ngOnInit() {
    this.hallStore.dispatch(addCinemaHallFromApi.getHall());
  }

  handleClickingButton(position: Position) {
    this.orderStore.dispatch(
      addOrderAction.decideOrder({
        order: [{ position: position.position, ticketType: 'Bilet normalny' }],
      })
    );
  }
}
