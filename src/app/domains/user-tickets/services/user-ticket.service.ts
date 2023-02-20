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

  get tickets$() {
    return this.tickets$$.asObservable();
  }

  displayTickets() {
    this.getUserTickets()
      .pipe(
        map((ticketsData) => {
          this.tickets$$.next([ticketsData.tickets]);
        })
      )
      .subscribe();
  }

  getUserTickets() {
    return this.http.get<UserTicket>(`http://localhost:3000/users/11`);
  }
}
