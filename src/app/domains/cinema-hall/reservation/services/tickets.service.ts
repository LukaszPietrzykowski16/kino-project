import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../reservation.component';

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

  addTicket(ticketInfo: Ticket) {
    this.tickets$$.next([...this.tickets$$.getValue(), ticketInfo]);
  }

  constructor() {}
}
