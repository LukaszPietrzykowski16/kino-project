import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserTicketService } from './services/user-ticket.service';

@Component({
  selector: 'app-user-tickets',
  standalone: true,
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css'],
  imports: [CommonModule, BrowserModule],
})
export class UserTicketsComponent {
  private userTicketService = inject(UserTicketService);

  tickets$ = this.userTicketService.tickets$;

  ngOnInit() {
    this.userTicketService.displayTickets();
  }
}
