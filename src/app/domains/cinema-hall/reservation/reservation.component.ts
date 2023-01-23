import { Component } from '@angular/core';
import { CinemaHallService } from '../services/cinema-hall.service';
import { SeatsService } from '../../../seats.service';
import { FormService } from '../../../form.service';
import { RouterLink } from '@angular/router';
import { ExtraApiService } from '../services/extra-api.service';
import { Film } from '../../../home/film-panel/film-panel.component';
import TicketApiService from '../../../ticket-api.service';

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

/*
a5 = {
  type: 'normal'
}

*/

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  // i need to mock up this from server so it's basically a bad aproach to change!
  test2: Array<TicketType> = [];
  name: String = '';

  header: Array<String> = [];
  newHeader: Array<Film> = [];
  seats: Array<Seat> = [];
  exactHour: string = '';

  selectedSeat: string = '';
  status: boolean = false;

  // change this array of objecs
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

  changeColor(number: number) {
    if (this.styleArray[number] === true) {
      this.styleArray[number] = false;
      this.removeSeat(this.selectedSeat);
    } else {
      this.styleArray[number] = true;
      this.tickets = [
        ...this.tickets,
        { seat: this.selectedSeat, type: 'bilet normalny', position: number },
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
      this.extraCall
        .displayInfoFromUrl()
        .subscribe((response) => (this.newHeader = response));
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
      const values = this.newHeader.map((test) => {
        return [test.title, test.date, this.test(test.hours)];
      });

      this.formService.form(values[0], this.tickets);
    } else {
      this.formService.form(this.header, this.tickets);
    }
  }
}
