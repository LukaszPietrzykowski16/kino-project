import { Component } from '@angular/core';
import { CinemaHallService } from '../services/cinema-hall.service';
import { FormService } from '../../../domains/form/services/form.service';
import { ExtraApiService } from '../services/extra-api.service';
import { Screening } from '../../../home/film-panel/film-panel.component';

import { SeatsService } from './services/seats.service';
import TicketApiService from '../services/ticket-api.service';

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
  test2: Array<TicketType> = [];
  name: String = '';

  header: Array<String> = [];
  newHeader: Array<any> = [];
  seats: Array<Seat> = [];
  exactHour: string = '';

  selectedSeat: string = '';
  status: boolean = false;
  tickets: Array<Ticket> = [];

  active: boolean = false;

  public styleArray = new Array<boolean>();

  checkSeat(seat: String) {
    this.selectedSeat = `${seat}`;
    this.status = !this.status;
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
      // this.removeSeat(this.selectedSeat);
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
    private formService: FormService,
    private extraCall: ExtraApiService,
    private ticketApi: TicketApiService
  ) {}

  ngOnInit() {
    this.header = this.cinemaHall.displayInfo();
    this.seatsService
      .getSeats()
      .subscribe((response) => (this.seats = response));
    if (
      this.header[0] === '' ||
      this.header[1] === '' ||
      this.header[2] === ''
    ) {
      this.extraCall.displayInfoFromUrl2().subscribe((response) =>
        response.map((res) => {
          this.newHeader = [...this.newHeader, ...[res.title]];
        })
      );
      this.extraCall
        .displayInfoFromUrl()
        .subscribe(
          (res) => (this.newHeader = [...this.newHeader, ...[res[0].date]])
        );

      this.exactHour = this.extraCall.getExactDate();
    }
    this.ticketApi.getTickets().subscribe((res) => this.test2.push(res));
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

  forms() {
    if (
      this.header[0] === '' ||
      this.header[1] === '' ||
      this.header[2] === ''
    ) {
      this.formService.form(
        [...this.newHeader, ...this.exactHour],
        this.tickets
      );
    } else {
      this.formService.form(this.header, this.tickets);
    }
  }
}
