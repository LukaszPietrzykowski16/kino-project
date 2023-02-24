import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserTicketService } from '../user-tickets/services/user-ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  imports: [NgIf, AsyncPipe, NgFor],
})
export default class TicketsComponent {
  private userTickets = inject(UserTicketService);
  private route = inject(ActivatedRoute);

  ticket$ = this.userTickets.ticket$;

  orderId: string | null = '';

  barcodeApiUrl = 'https://barcodeapi.org/api/127/';

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.userTickets.displayTicket(this.orderId);
  }
}
