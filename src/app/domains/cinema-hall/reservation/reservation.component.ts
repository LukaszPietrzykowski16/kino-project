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
  // private cartService = inject(CartService);
  private ticketsService = inject(TicketsService);

  test2: Array<TicketType> = [];
  seats: Array<Seat> = [];
  tickets: Array<Ticket> = [];

  exactHour: string = '';
  selectedSeat: string = '';
  name: string = '';

  reservation$ = this.cinemaHall.reservation$;
  tickets$ = this.ticketsService.tickets$;

  status: boolean = false;
  active: boolean = false;

  // private store = inject<Store<CartState>>(Store);

  public styleArray = new Array<boolean>();

  checkSeat(seat: String) {
    this.selectedSeat = `${seat}`;
    this.status = !this.status;
    // this.store.dispatch(
    //   CartActions.addToCart({
    //     place: this.selectedSeat,
    //   })
    // );
    console.log(this.tickets);
  }

  changeKey(position: string, keyValue: string) {
    for (let key in this.tickets) {
      if (this.tickets[key].seat === position) {
        this.tickets[key].type = keyValue;
      }
    }
  }

  removeSeat(place: string) {
    this.tickets = this.tickets.filter((el) => {
      return el.seat != place;
    });
  }

  removeSingleSeat(number: number) {
    if (this.styleArray[number] === true) {
      this.styleArray[number] = false;
      this.removeSeat(this.selectedSeat);
    } else {
      this.styleArray[number] = true;
      this.tickets = [
        ...this.tickets,
        {
          seat: this.selectedSeat,
          type: 'bilet normalny 25zł',
          position: number,
        },
      ];
    }
  }

  changeColor(number: number) {
    if (this.styleArray[number] === true) {
      this.styleArray[number] = false;
    } else {
      this.styleArray[number] = true;
      this.tickets = [
        ...this.tickets,
        {
          seat: this.selectedSeat,
          type: 'bilet normalny 25zł',
          position: number,
        },
      ];
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

  test(arrOfHours: Array<string>) {
    const statment = arrOfHours.map((oneHour) =>
      oneHour.includes(this.exactHour)
    );
    if (statment.includes(true)) {
      return this.exactHour;
    } else {
      return;
    }
  }
}
