import { Component, inject } from '@angular/core';
import { UserTicketService } from './services/user-ticket.service';

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
    this.userTicketService.fetchReservationTickets();
  }
}
