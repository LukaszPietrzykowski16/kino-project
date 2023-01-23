import { Injectable } from '@angular/core';
import { Ticket } from './domains/cinema-hall/reservation/reservation.component';
@Injectable({
  providedIn: 'root',
})
export class FormService {
  info: Array<String | undefined> = [];
  arrayTickets: Array<Ticket> = [];

  form(information: Array<String | undefined>, tickets: Array<Ticket>) {
    this.info = information;
    this.arrayTickets = tickets;
  }

  displayTitle() {
    return this.info;
  }

  displaySeats() {
    return this.arrayTickets;
  }

  constructor() {}
}
