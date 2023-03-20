import { Component, inject } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HallService } from './hall.service';

@Component({
  selector: 'app-reservation-hall',
  templateUrl: './reservation-hall.component.html',
  styleUrls: ['./reservation-hall.component.css'],
  standalone: true,
  // StoreModule.forFeature('AdminFilm', []),
})
export default class ReservationHallComponent {}
