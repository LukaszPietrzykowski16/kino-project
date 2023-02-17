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

  addTickets(seat: string, index: number, type: string) {
    this.tickets$$.next([
      ...this.tickets$$.getValue(),
      ...[{ seat: seat, position: index, type: type }],
    ]);
  }

  constructor() {}
}
