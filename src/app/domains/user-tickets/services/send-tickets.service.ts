import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { TicketsService } from '../../cinema-hall/reservation/services/tickets.service';
import { CinemaHallService } from '../../cinema-hall/services/cinema-hall.service';
import { SingleTicket } from '../user-ticket.interface';
import {
  SendReservationService,
  SingleReservation,
} from './send-reservation.service';
import { UserTicketService } from './user-ticket.service';

interface UrlId {
  urlId: number;
}

@Injectable({
  providedIn: 'root',
})
export class SendTicketsService {
  private http = inject(HttpClient);
  private ticketService = inject(TicketsService);
  private cinemaHall = inject(CinemaHallService);
  private authService = inject(AuthService);
  private userTickets = inject(UserTicketService);
  private sendReservation = inject(SendReservationService);

  private ticketInfo$$ = new BehaviorSubject<SingleTicket[]>([]);
  private urlInfo$$ = new BehaviorSubject<number[]>([]);
  private reservationInfo$$ = new BehaviorSubject<SingleReservation>(
    {} as SingleReservation
  );

  title = '';
  date = '';
  hour = '';

  tickets$ = this.ticketService.tickets$;
  reservation$ = this.cinemaHall.reservation$;

  get reservationInfo$() {
    return this.reservationInfo$$.asObservable();
  }

  get getTicketInfo$() {
    return this.ticketInfo$$.asObservable();
  }

  get getUrlInfo$() {
    return this.urlInfo$$.asObservable();
  }

  recunstructTicket() {
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

  isLogged = false;
  login$ = this.authService.isAuth$.pipe(map((isAuth) => isAuth.hasAuth));

  ngOnInit() {
    this.resetState();
    this.login$.subscribe((login) => {
      this.isLogged = login;
    });
  }

  sendTickets() {
    this.reservation$.subscribe((filmData) => {
      (this.title = filmData.title),
        (this.date = filmData.day),
        (this.hour = filmData.hour);
    });
    this.recunstructTicket();
    this.getTicketInfo$.subscribe((ticketData) => {
      this.postTickets(ticketData);
    });
  }

  postTickets(ticketData: Array<SingleTicket>) {
    this.userTickets.getUserTickets().subscribe((test) => {
      if (this.isLogged === true) {
        this.anotherFunction([...test.tickets, ...ticketData]);
      } else {
        ticketData.map((exactTicketData) => {
          this.postTicket(exactTicketData);
        });
      }
    });
  }

  anotherFunction(arr: Array<SingleTicket>) {
    return this.http
      .patch(`http://localhost:3000/users/11`, {
        tickets: arr,
      })
      .subscribe();
  }

  sendToTheDbReservationData(result: SingleTicket) {
    this.reservationInfo$$.next({
      ...this.reservationInfo$$.getValue(),
      id: NaN,
      userId: 11,
      ticketIdsArray: [result.id],
      date: result.date,
      title: result.title,
    });
  }

  postTicket(arr: SingleTicket) {
    return this.http
      .post<SingleTicket>(`http://localhost:3000/tickets`, {
        id: arr.id,
        title: arr.title,
        date: arr.date,
        hour: arr.hour,
        places: arr.places,
      })
      .subscribe((result) => {
        this.sendToTheDbReservationData(result);
        this.urlInfo$$.next([...this.urlInfo$$.getValue(), ...[result.id]]);
      });
  }

  resetState() {
    this.urlInfo$$.next([]);
    this.reservationInfo$$.next({} as SingleReservation);
  }

  sendReservationData() {
    this.sendReservation.postReservation(
      this.reservationInfo$$.value,
      this.urlInfo$$.value
    );
  }
}
