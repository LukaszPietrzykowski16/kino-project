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

  test2: Array<TicketType> = [];
  seats: Array<Seat> = [];

  exactHour: string = '';
  selectedSeat: string = '';
  name: string = '';

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketsService.tickets$;

  status: boolean = false;
  active: boolean = false;

  public styleArray = new Array<boolean>();

  checkSeat(seat: string) {
    this.selectedSeat = `${seat}`;
    this.status = !this.status;
  }

  addSeat(seat: string, position: number, isAvailiable: boolean | undefined) {
    if (isAvailiable === false || isAvailiable === undefined) {
      this.ticketsService.addTicket({
        seat: seat,
        position: position,
        type: 'bilet normalny',
      });
    }
    if (isAvailiable === true) {
      this.removeSeat(position);
    }
  }

  // changeKey(position: string, keyValue: string) {
  //   for (let key in this.tickets) {
  //     if (this.tickets[key].seat === position) {
  //       this.tickets[key].type = keyValue;
  //     }
  //   }
  // }

  removeSeat(position: number) {
    this.ticketsService.removeTicket(position);
  }

  removeSingleSeat(number: number) {
    if (this.styleArray[number] === true) {
      this.styleArray[number] = false;
    } else {
      this.styleArray[number] = true;
    }
  }

  changeColor(number: number) {
    if (this.styleArray[number] === true) {
      this.styleArray[number] = false;
    } else {
      this.styleArray[number] = true;
    }
  }

  constructor(
    private cinemaHall: CinemaHallService,
    private seatsService: SeatsService,
    private ticketApi: TicketApiService
  ) {}

  displaySeats() {
    this.seatsService
      .getSeats()
      .subscribe((response: Seat[]) => (this.seats = response));
  }

  getTickets() {
    this.ticketApi.getTickets().subscribe((res) => this.test2.push(res));
  }

  ngOnInit() {
    this.displaySeats();
    this.getTickets();
  }
}
