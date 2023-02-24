import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { BehaviorSubject, map, tap } from 'rxjs';
import { SingleTicket, UserTicket } from '../user-ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class UserTicketService {
  private http = inject(HttpClient);

  private tickets$$ = new BehaviorSubject<SingleTicket[]>([]);
  private ticket$$ = new BehaviorSubject<SingleTicket>({
    date: '',
    hour: '',
    id: NaN,
    place: {
      seat: '',
      type: '',
    },
    title: '',
  });

  get tickets$() {
    return this.tickets$$.asObservable();
  }

  get ticket$() {
    return this.ticket$$.asObservable();
  }

  displayTicket(id: string | null) {
    this.getVisitorTickets(id).subscribe((ticket) => {
      console.log(ticket);
      this.ticket$$.next(ticket);
    });
  }

  displayTickets() {
    this.getUserTickets().subscribe((ticketsData) =>
      this.tickets$$.next(ticketsData.tickets)
    );
  }

  getUserTickets() {
    return this.http.get<UserTicket>(`http://localhost:3000/users/11`);
  }

  getVisitorTickets(id: string | null) {
    return this.http.get<SingleTicket>(`http://localhost:3000/tickets/${id}`);
  }
}
