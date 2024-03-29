import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface SingleReservation {
  id: number;
  userId: number;
  ticketIdsArray: Array<number>;
  date: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class SendReservationService {
  private http = inject(HttpClient);

  postReservation(reservationInfo: SingleReservation, arrayId: number[]) {
    console;
    return this.http
      .post<SingleReservation>(`http://localhost:3000/tickets-reservation`, {
        id: NaN,
        userId: 11,
        date: reservationInfo.date,
        title: reservationInfo.title,
        ticketIdsArray: arrayId,
      })
      .subscribe();
  }
}
