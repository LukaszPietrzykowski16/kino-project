import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserTicketService } from './services/user-ticket.service';
import { UserTicketComponent } from './user-ticket/user-ticket.component';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css'],
})
export class UserTicketsComponent {
  private userTicketService = inject(UserTicketService);

  tickets$ = this.userTicketService.tickets$;
  ticketReservation$ = this.userTicketService.ticketsReservation$;

  ngOnInit() {
    console.log('hello');
    this.userTicketService.fetchReservationTickets();
    // this.userTicketService.displayTickets();
  }
}
