import { Component, inject } from '@angular/core';
import { CinemaHallService } from '../services/cinema-hall.service';
import { SeatsService } from './services/seats.service';
import TicketApiService from '../services/ticket-api.service';
import { TicketsService } from './services/tickets.service';

export interface Seat {
  seat: string;
  avaliable: boolean;
  id: number;
  isChoosen: boolean;
  reservation: boolean;
}

export interface Ticket {
  seat: string;
  type: string;
  position: number;
}

export interface TicketType {
  'bilet normalny': number;
  'bilet rodzinny': number;
  'bilet ulgowy': number;
  voucher: number;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  private ticketsService = inject(TicketsService);

  ticketTypeArray: Array<TicketType> = [];

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketsService.tickets$;
  seats$ = this.seatsService.seats$;

  changeKey(position: number, keyValue: string) {
    this.ticketsService.changeTicketType(position, keyValue);
  }

  removeTicket(position: number) {
    this.ticketsService.removeTicket(position);
  }

  getPosition(number: number) {
    return this.ticketsService.getSeat(number);
  }

  changeColor(position: number, index: string) {
    if (this.getPosition(position) === true) {
      this.removeTicket(position);
    } else {
      this.ticketsService.addTicket({
        seat: index,
        position: position,
        type: 'bilet normalny 25zł',
      });
    }
  }

  constructor(
    private cinemaHall: CinemaHallService,
    private seatsService: SeatsService,
    private ticketApi: TicketApiService
  ) {}

  getTickets() {
    this.ticketApi
      .getTickets()
      .subscribe(
        (res) => (this.ticketTypeArray = [...this.ticketTypeArray, ...[res]])
      );
  }

  ngOnInit() {
    this.seatsService.createSeats();
    this.getTickets();
  }
}
