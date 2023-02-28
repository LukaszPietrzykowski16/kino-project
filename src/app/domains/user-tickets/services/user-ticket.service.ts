import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { SingleTicket, UserTicket } from '../user-ticket.interface';

interface Rating {
  filmId: number;
  rating: number;
}

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
    places: {
      seat: '',
      type: '',
    },
    title: '',
  });
  private ratings$$ = new BehaviorSubject<Rating[]>([]);

  get tickets$() {
    return this.tickets$$.asObservable();
  }

  get ticket$() {
    return this.ticket$$.asObservable();
  }

  get ratings$() {
    return this.ratings$$.asObservable();
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

  mainPageInfo() {
    this.getUserTickets().subscribe((ticketsData) =>
      this.ratings$$.next(ticketsData.ratings)
    );
  }

  getUserTickets() {
    return this.http.get<UserTicket>(`http://localhost:3000/users/11`);
  }

  getVisitorTickets(id: string | null) {
    return this.http.get<SingleTicket>(`http://localhost:3000/tickets/${id}`);
  }
}
