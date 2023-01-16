import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import TicketApiService from '../ticket-api.service';

export interface TicketType {
  "bilet normalny": number
  "bilet rodzinny": number
  "bilet ulgowy": number
  "voucher": number
}

@Component({
  selector: 'app-tickets-price',
  templateUrl: './tickets-price.component.html',
  styleUrls: ['./tickets-price.component.css']
})



export class TicketsPriceComponent {
  test: Array<TicketType> = []

  constructor(private ticketApi: TicketApiService) {}  

  ngOnInit(){
    this.ticketApi.getTickets().subscribe(res => this.test.push(res))
    console.log('hello')
}
}