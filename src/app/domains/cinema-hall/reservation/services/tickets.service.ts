import { Injectable } from '@angular/core';
import { relativeTimeRounding } from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../reservation.component';

// map type

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private tickets$$ = new BehaviorSubject<Ticket[]>([]);

  get tickets$() {
    return this.tickets$$.asObservable();
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

  getSeat(position: number) {
    return this.tickets$$.value.some((e) => e.position === position);
  }

  addTicket(ticketInfo: Ticket) {
    this.tickets$$.next([...this.tickets$$.getValue(), ticketInfo]);
  }

  constructor() {}
}
