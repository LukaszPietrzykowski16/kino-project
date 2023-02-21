import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  updateTickets(data: any) {
    this.getUserTickets().subscribe((test) => {
      console.log(test.tickets);
    });

    console.log(data);
  }

  displayTickets() {
    this.getUserTickets().subscribe((ticketsData) =>
      this.tickets$$.next(ticketsData.tickets)
    );
  }

  getUserTickets() {
    return this.http.get<UserTicket>(`http://localhost:3000/users/11`);
  }
}
