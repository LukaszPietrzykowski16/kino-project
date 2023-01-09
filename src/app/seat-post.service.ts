import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Seat, Ticket } from './reservation/reservation.component';

@Injectable({
  providedIn: 'root'
})
export class SeatPostService {

  private http = inject(HttpClient)


  sendSeats(arrayOfSeats: Array<Ticket>){
    arrayOfSeats.map((exactSeat) => {
      console.log(exactSeat.position)
      this.postSeat(exactSeat.seat)
    })
  }

  postSeat(exactSeat: string){
    console.log(exactSeat)
    return this.http
        .patch<Seat>('http://localhost:3000/reservation', {
        seat: exactSeat,
        avaliable: false
    }).subscribe()
  }

  constructor() { }
}
