import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../reservation.component';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private tickets$$ = new BehaviorSubject<Ticket[]>([
    {
      seat: '',
      type: '',
      position: NaN,
    },
  ]);

  get tickets$() {
    return this.tickets$$.asObservable();
  }

  constructor() {}
}
