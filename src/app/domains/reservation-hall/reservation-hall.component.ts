import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addCinemaHallFromApi } from './store/hall.action';
import { HallState } from './store/hall.interface';
import { HallComponent, Position } from './hall/hall.component';
import { selectorHall } from './store/hall.selector';

@Component({
  selector: 'app-reservation-hall',
  templateUrl: './reservation-hall.component.html',
  styleUrls: ['./reservation-hall.component.scss'],
  standalone: true,
  imports: [CommonModule, HallComponent],
})
export class ReservationHallComponent {
  private store = inject<Store<HallState>>(Store);

  hall$ = this.store.select(selectorHall);

  ngOnInit() {
    this.store.dispatch(addCinemaHallFromApi.getHall());
  }

  handleClickingButton(test: Position) {
    console.log(test.position);
  }
}
