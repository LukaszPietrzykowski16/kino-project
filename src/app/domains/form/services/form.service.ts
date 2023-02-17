import { inject, Injectable } from '@angular/core';
import { Ticket } from '../../../domains/cinema-hall/reservation/reservation.component';
import { CinemaHallService } from '../../cinema-hall/services/cinema-hall.service';
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

  displaySeats() {
    return this.arrayTickets;
  }
}
