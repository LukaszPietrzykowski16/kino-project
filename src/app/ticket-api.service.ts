import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from './reservation/reservation.component';
import { TicketType } from './tickets-price/tickets-price.component';

@Injectable({
  providedIn: 'root'
})
export default class TicketApiService {

  url:string = `http://localhost:3000/ticket-types`


  constructor(private http: HttpClient) {}
  
  getTickets(){
    return this.http.get<TicketType>(this.url);
  }

}
