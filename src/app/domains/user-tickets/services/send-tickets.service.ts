import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicketsService } from '../../cinema-hall/reservation/services/tickets.service';
import { CinemaHallService } from '../../cinema-hall/services/cinema-hall.service';
import { SingleTicket } from '../user-ticket.interface';
import { UserTicketService } from './user-ticket.service';

@Injectable({
  providedIn: 'root',
})
export class SendTicketsService {
  private http = inject(HttpClient);
  private ticketService = inject(TicketsService);
  private cinemaHall = inject(CinemaHallService);
  private userTickets = inject(UserTicketService);

  private ticketInfo$$ = new BehaviorSubject<SingleTicket[]>([]);

  get getTicketInfo$() {
    return this.ticketInfo$$.asObservable();
  }

  title = '';
  date = '';
  hour = '';

  tickets$ = this.ticketService.tickets$;
  reservation$ = this.cinemaHall.reservation$;

  constructor() {}

  sendTickets2() {
    this.tickets$.subscribe((filmData) => {
      filmData.map((test) => {
        this.ticketInfo$$.next([
          ...this.ticketInfo$$.getValue(),
          {
            id: NaN,
            title: this.title,
            date: this.date,
            hour: this.hour,
            places: {
              seat: test.seat,
              type: test.type,
            },
          },
        ]);
      });
    });
  }

  sendTickets() {
    this.reservation$.subscribe((filmData) => {
      (this.title = filmData.title),
        (this.date = filmData.day),
        (this.hour = filmData.hour);
    });
    this.sendTickets2();
    this.getTicketInfo$.subscribe((ticketData) => {
      this.postTickets(ticketData);
    });
  }

  postTickets(ticketData: Array<SingleTicket>) {
    console.log(ticketData);
    this.userTickets.getUserTickets().subscribe((test) => {
      this.anotherFunction([...test.tickets, ...ticketData]);
    });
  }

  anotherFunction(arr: any) {
    return this.http
      .patch<Array<Number>>(`http://localhost:3000/users/11`, {
        tickets: arr,
      })
      .subscribe();
  }
}