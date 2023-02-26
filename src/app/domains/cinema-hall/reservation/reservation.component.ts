import { Component, inject } from '@angular/core';
import { CinemaHallService } from '../services/cinema-hall.service';
import { SeatsService } from './services/seats.service';
import TicketApiService from '../services/ticket-api.service';
import { TicketsService } from './services/tickets.service';
import { isEmpty, tap } from 'rxjs';
import { ExtraApiService } from '../services/extra-api.service';
import { SeatPostService } from '../../form/services/seat-post.service';

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
  color: boolean;
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
  private cinemaHall = inject(CinemaHallService);
  private seatsService = inject(SeatsService);
  private ticketApi = inject(TicketApiService);
  private ticketsService = inject(TicketsService);
  private extraApiService = inject(ExtraApiService);
  private seatPostService = inject(SeatPostService);

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

  reserveSeat(position: number, seatIndex: string) {
    this.seatPostService.reserveSeat(position, seatIndex);
  }

  changeColor(position: number, seatIndex: string) {
    this.reserveSeat(position, seatIndex);
    if (this.getPosition(position) === true) {
      this.removeTicket(position);
    } else {
      this.ticketsService.addTicket({
        seat: seatIndex,
        position: position,
        type: 'bilet normalny 25zł',
        color: true,
      });
    }
  }

  getTickets() {
    this.ticketApi
      .getTickets()
      .subscribe(
        (res) => (this.ticketTypeArray = [...this.ticketTypeArray, ...[res]])
      );
  }

  ngOnInit() {
    this.reservation$
      .pipe(
        tap((data) => {
          if (data.day === '' || data.hour === '' || data.hour === '') {
            this.extraApiService.getFilm();
          }
        })
      )
      .subscribe()
      .unsubscribe();

    this.seatsService.createSeats();
    this.getTickets();
  }
}
