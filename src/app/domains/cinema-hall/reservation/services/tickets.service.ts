import { Injectable } from '@angular/core';
import { relativeTimeRounding } from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../reservation.component';

// map type
type ReservedSeats = {
  [key: number]: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private tickets$$ = new BehaviorSubject<Ticket[]>([]);
  private reservedSeats$$ = new BehaviorSubject<ReservedSeats[]>([
    {
      [NaN]: true,
    },
  ]);

  get tickets$() {
    return this.tickets$$.asObservable();
  }

  get reservedSeats$() {
    return this.reservedSeats$$.asObservable();
  }

  removeTicket(position: number) {
    let filtrated = this.tickets$$.value.filter(
      (elem) => elem.position !== position
    );
    this.tickets$$.next([]); // is it really good aproach?
    this.tickets$$.next([...this.tickets$$.getValue(), ...filtrated]);
  }

  changeTicketType(position: number, ticketType: string) {
    let updatedTicket = {};
    updatedTicket = this.tickets$$.value.map((val) => {
      if (val.position === position) {
        // this logic could be better optymaized
        this.addTicket({
          position: val.position,
          type: ticketType,
          seat: val.seat,
        });
        this.removeTicket(val.position);
        this.addTicket({
          position: val.position,
          type: ticketType,
          seat: val.seat,
        });
      }
    });
  }

  addTicket(ticketInfo: Ticket) {
    this.tickets$$.next([...this.tickets$$.getValue(), ticketInfo]);
  }

  addSeat(seatNumber: number) {
    this.reservedSeats$$.next([
      ...this.reservedSeats$$.getValue(),
      { [seatNumber]: true },
    ]);
  }

  removeSeat(position: number) {
    // let filtrated = this.reservedSeats$$.value.filter((elem) =>
    //   console.log(elem)
    // );
    // this.reservedSeats$$.next([]); // is it really good aproach?
    // this.reservedSeats$$.next([
    //   ...this.reservedSeats$$.getValue(),
    //   ...filtrated,
    // ]);
  }

  // removeSeat(position: number) {
  //   let filtrated = this.tickets$$.value.filter(
  //     (elem) => elem.position !== position
  //   );
  //   this.tickets$$.next([]); // is it really good aproach?
  //   this.tickets$$.next([...this.tickets$$.getValue(), ...filtrated]);
  // }

  constructor() {}
}
