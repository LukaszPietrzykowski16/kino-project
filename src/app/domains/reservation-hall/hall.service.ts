import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SingleCinemaHall } from './store/hall.interface';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private http = inject(HttpClient);

  getReservation() {
    return this.http.get<SingleCinemaHall[]>(
      'http://localhost:3000/reservation-hall'
    );
  }
}
