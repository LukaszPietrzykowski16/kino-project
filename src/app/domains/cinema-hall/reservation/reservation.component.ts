import { Component, inject } from '@angular/core';
import { CinemaHallService } from '../services/cinema-hall.service';
import { FormService } from '../../../domains/form/services/form.service';
import { ExtraApiService } from '../services/extra-api.service';
import { Screening } from '../../../home/film-panel/film-panel.component';
import { SeatsService } from './services/seats.service';
import TicketApiService from '../services/ticket-api.service';
import { select, Store, StoreModule } from '@ngrx/store';
import { CartState } from '../../cart/cart.interface';
import { CartActions } from '../../cart/store/cart.action';
import { CartService } from '../../cart/service/cart.service';
import { cartReducer } from '../../cart/store/cart.reducer';
import { TicketsService } from './services/tickets.service';

export interface Seat {
  seat: string;
  avaliable: boolean;
  id: number;
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
  seats: Array<Seat> = [];

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketsService.tickets$;
  reservedSeats$ = this.ticketsService.reservedSeats$;

  public styleArray = new Array<boolean>();

  addSeat(seat: string, position: number, isAvailiable: boolean | undefined) {
    if (isAvailiable === false || isAvailiable === undefined) {
      this.ticketsService.addTicket({
        seat: seat,
        position: position,
        type: 'bilet normalny 25zł',
      });
    }
    if (isAvailiable === true) {
      this.removeTicket(position);
    }
  }

  changeKey(position: number, keyValue: string) {
    this.ticketsService.changeTicketType(position, keyValue);
  }

  removeTicket(position: number) {
    this.ticketsService.removeTicket(position);
  }

  changeColor(number: number) {
    if (this.styleArray[number] === true) {
      this.ticketsService.removeSeat(number);
      this.styleArray[number] = false;
    } else {
      this.ticketsService.addSeat(number);
      this.styleArray[number] = true;
    }
    console.log(this.styleArray);
    this.reservedSeats$.subscribe((test) => {
      console.log(test);
    });
  }

  constructor(
    private cinemaHall: CinemaHallService,
    private seatsService: SeatsService,
    private ticketApi: TicketApiService
  ) {}

  displaySeats() {
    this.seatsService
      .getSeats() // it 's cold observable so we can just leave it is how it is
      .subscribe((response: Seat[]) => (this.seats = response));
  }

  getTickets() {
    this.ticketApi
      .getTickets()
      .subscribe(
        (res) => (this.ticketTypeArray = [...this.ticketTypeArray, ...[res]])
      );
  }

  ngOnInit() {
    this.displaySeats();
    this.getTickets();
  }
}
