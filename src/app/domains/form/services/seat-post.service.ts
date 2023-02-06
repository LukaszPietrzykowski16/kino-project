import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Seat,
  Ticket,
} from '../../cinema-hall/reservation/reservation.component';

@Injectable({
  providedIn: 'root',
})
export class SeatPostService {
  private http = inject(HttpClient);

  sendSeats(arrayOfSeats: Array<Ticket>) {
    arrayOfSeats.map((exactSeat) => {
      this.postSeat(exactSeat.seat, exactSeat.position);
    });
  }

  postSeat(exactSeat: string, position: number) {
    return this.http
      .patch<Seat>(`http://localhost:3000/reservation/${position}`, {
        seat: exactSeat,
        avaliable: false,
      })
      .subscribe();
  }
}
