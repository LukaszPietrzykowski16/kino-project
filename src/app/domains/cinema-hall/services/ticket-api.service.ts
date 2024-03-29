import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketType } from '../reservation/reservation.component';

@Injectable({
  providedIn: 'root',
})
export default class TicketApiService {
  private url: string = `http://localhost:3000/ticket-types`;

  constructor(private http: HttpClient) {}

  getTickets() {
    return this.http.get<TicketType>(this.url);
  }
}
